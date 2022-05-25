import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import LoadData from "./LoadData";

const useProfile = () => {
  const [user] = useAuthState(auth);
  const { data, refetch } = LoadData(
    `http://localhost:5000/user/${user?.email}`,
    ["userProfile", user?.email]
  );
  return data?.data;
};

export default useProfile;
