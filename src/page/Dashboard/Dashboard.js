import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useEffect } from "react";
import { useState } from "react";
import useProfile from "../../hooks/useProfile";

import Progress from "../../components/Progress/Progress";
import ProductActionModal from "./Admin/ProductActionModal";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const profile = useProfile();
  const [edititem, setEdititem] = useState({});

  if (loading) {
    return <Progress />
  }
  return (
    <div>
      <div className="drawer drawer-mobile ">
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
          <ul className="menu p-4 overflow-y-auto w-62  bg-slate-800 text-gray-200 text-base-content font-code">
            {profile?.role === "admin" && (
              <>
                <li>
                  <Link to="admin/order">
                    <i className="fa-solid fa-folder-tree pr-2"></i>
                    Manage Orders
                  </Link>
                </li>
                <li>
                  <Link to="admin/review">
                    <i className="fa-solid fa-comment pr-2"></i>
                    Manage Reviews
                  </Link>
                </li>
                <li>
                  <Link to="admin/user">
                    <i className="fa-solid fa-user-tie pr-2"></i>
                    Manage user
                  </Link>
                </li>
                <li>
                  <Link to="admin/products">
                    <i className="fa-brands fa-product-hunt pr-2"></i>
                    Manage products
                  </Link>
                </li>

                
                <li>
                  
                  <label
              onClick={() => setEdititem({})}
              htmlFor="product-modal"
              className=""
            ><i className="fa-brands fa-product-hunt pr-2"></i> Add Product</label>
                </li>
              </>
            )}
            {profile?.role === "client" && (
              <>
                <li>
                  <Link to="order">
                    <i className="fa-solid fa-folder-tree pr-2"></i>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="review">
                    <i className="fa-solid fa-comment pr-2"></i>
                    Reviews
                  </Link>
                </li>
                {/* <li>
                  <Link to="admin/user">
                    <i className="fa-solid fa-user-tie pr-2"></i>
                    Manage user
                  </Link>
                </li>
                <li>
                  <Link to="admin/products">
                    <i className="fa-solid fa-user-tie pr-2"></i>
                    Manage products
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </div>
      <ProductActionModal
        product={edititem}
        setEdititem={setEdititem}
        
      ></ProductActionModal>
    </div>
  );
};

export default Dashboard;
