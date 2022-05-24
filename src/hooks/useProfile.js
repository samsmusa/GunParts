import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import LoadReviews from "./LoadRevies";

const useProfile = () => {
  const [user] = useAuthState(auth);
  const { data: profile, refetch } = LoadReviews(
    `http://localhost:5000/user/${user?.email}`,
    ["userProfile", user?.email]
  );
  return [profile];
};

export default useProfile;
