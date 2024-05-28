import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // A bit similar to useState hook
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
