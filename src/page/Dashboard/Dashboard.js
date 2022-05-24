import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useEffect } from "react";
import { useState } from "react";
import useProfile from "../../hooks/useProfile";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [profile] = useProfile();
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-3 bg-zinc-900">
          <label
            htmlFor="my-drawer-2"
            className="block btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <div className="text-left px-2">
            <p className="m-0 p-0">Loged in</p>
            <p className="text-xs">[ {user?.email} ]</p>
            <p className="m-0 p-0">Last view at</p>
            <p className="text-xs">[ {user?.metadata?.lastSignInTime} ]</p>
            <p className="m-0 p-0">Account Created at</p>
            <p className="text-xs"> [ {user?.metadata?.creationTime} ]</p>
          </div>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content font-code">
            <li>
              <Link to="order">
                <i className="fa-solid fa-folder-tree pr-2"></i>
                {profile?.role === "admin" ? "Manage Orders" : "Orders"}
              </Link>
            </li>
            <li>
              <Link to="review">
                <i className="fa-solid fa-comment pr-2"></i>
                {profile?.role === "admin" ? "Manage Reviews" : "Revies"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
