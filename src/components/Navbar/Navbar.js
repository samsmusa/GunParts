import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import Progress from "../Progress/Progress";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const profile = useProfile();

  return (
    <div className="navbar bg-gradient-to-r from-black via-slate-300 to-black text-white ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-cursive">
          PistolBD
        </Link>
      </div>
      <div className="flex-none text-white">
        <Link className="pr-2" to="/">
          <button className="btn text-white btn-sm cbtn btn-outline">
            Home
          </button>
        </Link>
        <Link className="pr-2" to="/about">
          <button className="btn text-white btn-sm cbtn btn-outline">
            About
          </button>
        </Link>
        <Link className="pr-2" to="/blog">
          <button className="btn text-white btn-sm cbtn btn-outline">
            blog
          </button>
        </Link>
        <Link className="pr-2" to="/portfolio">
          <button className="btn text-white btn-sm cbtn btn-outline">
            Portfolio
          </button>
        </Link>
        {!user && (
          <Link className="pr-2" to="/login">
            <button className="btn text-white btn-sm cbtn btn-outline">
              Login
            </button>
          </Link>
        )}
        {user && (
          <>
            <Link
              to={
                profile?.role === "admin"
                  ? "dashboard/admin/order"
                  : "dashboard/order"
              }
            >
              <button className="btn text-white btn-sm cbtn btn-outline">
                Dashboard
              </button>
            </Link>

            <Link to="/profile" className="justify-between">
              <button className="btn text-white btn-sm cbtn btn-outline px-3">
                Profile
              </button>
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile?.img} alt="avatar" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="bg-slate-800 menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  {user.displayName + "(profile)"}
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to={
                    profile?.role === "admin"
                      ? "dashboard/admin/order"
                      : "dashboard/order"
                  }
                >
                  dashboard
                </Link>
              </li>
              <li>
                <span onClick={() => signOut(auth)}>
                  Logout({user?.displayName})
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
