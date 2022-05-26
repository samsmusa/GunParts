import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [userExist, setuserExist] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`https://fathomless-wave-64649.herokuapp.com/user/${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            setuserExist(true);
            if (res.data.role === "admin") {
              setAdmin(true);
              setAdminLoading(false);
            } else {
              setAdminLoading(false);
            }
          }
        });
    }
  }, [user]);

  return [admin, adminLoading];
};

export default useAdmin;
