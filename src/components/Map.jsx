import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  // A bit similar to useState hook
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // While mapLat and mapLng changes over time, the mapPositon also need to be changed.
  useEffect(
    function () {
      // if mapLat or mapLng not exist, mapPostion maintain the previous value
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        // PROBLEM: While position changes, the map won't move there. ("center" is not reactive)
        // So, we need to implement this functionality on our own within the Leaflet Library
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// CUTSOM HOOK FOR CHANGE THE MAP CENTER
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// CUSTOM HOOK FOR CLICKING ON MAP (Because "onClick" doesn't work on Leaflet Library)
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
