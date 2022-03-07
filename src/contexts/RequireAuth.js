import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

const RequireAuth = ({ children }) => {
  const { auth } = useContext(AuthContext);
  let location = useLocation();

  if (auth) {
    if (auth && location.pathname === "/login") {
      return <Navigate to="/" replace />;
    }
    return children;
  } else if (!auth) {
    if (!auth && location.pathname === "/login") {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
