import { useNavigate } from "react-router";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  // Because useEffect is only executed after the render has already happened
  // if !isAuthenticated, browser will give us an error before running the useEffect()
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
