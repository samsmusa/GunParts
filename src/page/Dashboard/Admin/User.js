import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Progress from "../../../components/Progress/Progress";
import auth from "../../../firebase.init";
import LoadData from "../../../hooks/LoadData";
import RoleActionModal from "./RoleActionModal";

const User = () => {
  const [user, loading] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState({});
  const [allUser, setAllUser] = useState([]);
  const [clientUser, setClientUser] = useState([]);
  const [adminUser, setAdminUser] = useState([]);
  const {
    data: users,
    isLoading,
    refetch,
  } = LoadData("https://fathomless-wave-64649.herokuapp.com/user", ["allUser"]);

  useEffect(() => {
    if (users?.data) {
      setAllUser(users.data);
      setClientUser(users.data.filter((e) => e.role === "client"));
      setAdminUser(users.data.filter((e) => e.role === "admin"));
    }
  }, [users?.data]);

  if (isLoading || loading) {
    return <Progress />;
  }
  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div>
          <span className="pr-2 text-xl">Users</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost h-8 w-40"
            disabled={true}
          />
          <button className="btn btn-sm ml-4 bg-base-100">Search</button>
        </div>
      </div>
      <p className="text-left pt-2">
        {" "}
        <span
          className="cursor-pointer text-sm"
          onClick={() => setAllUser(users?.data)}
        >
          All ({users?.data.length})
        </span>{" "}
        | |{" "}
        <span
          className="cursor-pointer text-sm text-warning"
          onClick={() => setAllUser(clientUser)}
        >
          Regular user ({clientUser?.length})
        </span>{" "}
        |{" "}
        <span
          className="cursor-pointer text-sm text-info"
          onClick={() => setAllUser(adminUser)}
        >
          Admin user ({adminUser?.length})
        </span>{" "}
        |{" "}
      </p>
      <div className="pt-2">
        <table className="table-auto w-full h-60">
          <thead className="">
            <tr className="border-2 border-sky-500  border-x-0 ">
              <th className="">No</th>
              <th className="">name</th>
              <th className="">image</th>
              <th className="">email</th>
              <th className="">Orders</th>
              <th className="">reviews</th>
              <th className="">status</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser &&
              allUser.map((e, index) => (
                <tr
                  key={e._id}
                  className={
                    e?.role === "admin"
                      ? "border border-info border-x-0 "
                      : "border border-success  border-x-0 "
                  }
                >
                  <th className="">{index + 1}</th>
                  <th className="">{e?.name}</th>
                  <th className="">
                    <img className="w-15 h-10" src={e?.img} alt="img" />{" "}
                  </th>
                  <th className="">{e.email}</th>
                  <th className="">{4}</th>
                  <th className="">4</th>
                  <th className="">{e?.role}</th>
                  <th className="">
                    <div
                      className={
                        e?.email === user?.email
                          ? "tooltip tooltip-info  tooltip-left"
                          : e?.role === "admin"
                          ? "tooltip tooltip  tooltip-left"
                          : "tooltip tooltip-success  tooltip-left"
                      }
                      data-tip={
                        e?.email === user?.email
                          ? "Your Account"
                          : e?.role === "admin"
                          ? "Make Normal user"
                          : "Make admin"
                      }
                    >
                      <label
                        onClick={() => setUserProfile(e)}
                        disabled={e?.email === user?.email}
                        htmlFor="user-action-modal"
                        className="btn mx-1 btn-sm "
                      >
                        <i
                          className={
                            e?.role === "admin"
                              ? "fa-solid fa-toolbox text-success"
                              : "fa-solid fa-toolbox"
                          }
                        ></i>
                      </label>
                    </div>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <RoleActionModal data={userProfile} refetch={refetch} />
    </div>
  );
};

export default User;
