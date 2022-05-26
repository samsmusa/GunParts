import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";

const LoadData = (url, def, obj = {}) => {
  const { isLoading, error, data, refetch } = useQuery(
    def,
    () =>
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),

    obj
  );
  return { isLoading, error, data, refetch };
};

export default LoadData;
