import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import useAdmin from "./useAdmin";
import Progress from "../components/Progress/Progress";
import auth from "../firebase.init";

const RequireAdmin =  ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] =  useAdmin(user);
  const location = useLocation();

  if (adminLoading || loading) {
    return <Progress />;
  }
  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAdmin;
