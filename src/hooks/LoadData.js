import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";

const LoadData = (url, def) => {
  const [user] = useAuthState(auth)
  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery(def, () =>
    fetch(url).then((res) => res.json())
    
    ,
    {
      enabled: !!user?.email,
    });
  return {isLoading, error, data, refetch}
}

export default LoadData;
