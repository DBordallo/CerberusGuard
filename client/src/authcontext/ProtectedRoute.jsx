import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { useState, useEffect } from "react";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (isLoading) {
    return (
      <Spinner
        animation="grow"
        variant="primary"
        style={{
          width: "5rem",
          height: "5rem",
          display: "block",
          position: "fixed",
          top: "200px",
          left: "50%",
        }}
      />
    );
  }

  if (!user) return <Navigate to="/" />;

  return children;
}
