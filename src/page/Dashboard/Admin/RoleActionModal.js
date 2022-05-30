import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

const RoleActionModal = ({ data, refetch }) => {
  const closeRefmodal = useRef();

  const deleteItem = () => {
    const { _id, ...user } = data;
    let role = "client";
    if (user?.role === "admin") {
      user.role = "client";
      role = "client";
    } else {
      user.role = "admin";
      role = "admin";
    }
    fetch("https://fathomless-wave-64649.herokuapp.com/user", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success(`${role} created successfully`);
          refetch();
        } else {
          toast.error("somethig error");
          refetch();
        }
      });

    closeRefmodal.current.click();
  };
  return (
    <div>
      <input type="checkbox" id="user-action-modal" className="modal-toggle" />
      <div className="modal   modal-bottom sm:modal-middle">
        <div
          className={
            data?.role === "client"
              ? "modal-box bg-warning text-black"
              : "modal-box bg-slate-800"
          }
        >
          <label
            ref={closeRefmodal}
            htmlFor="user-action-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            {data?.role === "admin"
              ? `Want to make Normal user (${data?.name}) ?`
              : `Want to make Admin user (${data?.name}) ?`}
          </h3>
          <div className="avatar py-4">
            <div className="w-24 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=92310" />
            </div>
          </div>
          <p className="">{data?.email}</p>
          <div className="modal-action">
            <label onClick={deleteItem} className="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleActionModal;
