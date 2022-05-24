import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Progress from "../../components/Progress/Progress";
import auth from "../../firebase.init";
import LoadReviews from "../../hooks/LoadRevies";
import useProfile from "../../hooks/useProfile";
import OrderModal from "./OrderModal";

const Order = () => {
  const [user, loading, autherror] = useAuthState(auth);
  const [profile] = useProfile();
  const [order, setOrder] = useState([]);
  const [processing, setprocessing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [pending, setpending] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { formerror: errors },
  } = useForm();

  const {
    data: all,
    refetch,
    isLoading,
  } = LoadReviews(
    profile?.role === "admin"
      ? "http://localhost:5000/orders"
      : `http://localhost:5000/orders/?email=${user?.email}&status=all`,
    ["userOrder", profile?.role]
  );

  useEffect(() => {
    if (!!all) {
      setOrder(all);
      setprocessing(all.filter((e) => e.status === "processing"));
      setCanceled(all.filter((e) => e.status === "canceled"));
      setComplete(all.filter((e) => e.status === "complete"));
      setpending(all.filter((e) => e.status === "pending"));
    }
  }, [all]);

  const [lot, setlot] = useState([]);
  const actionItem = (product, status) => {
    product.status = status;
    fetch("http://localhost:5000/order", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
      });
  };
  if (isLoading) {
    return <Progress />;
  }
  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div>
          <span className="pr-2 text-xl">Orders</span>
          <span>
            <button className="btn btn-sm btn-outline">Add order</button>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost h-8 w-40"
            {...register("email")}
            disabled={true}
          />
          <button className="btn btn-sm ml-4 bg-base-100">Search</button>
        </div>
      </div>
      <p className="text-left pt-2">
        {" "}
        <span className="cursor-pointer text-sm" onClick={() => setOrder(all)}>
          All ({all?.length})
        </span>{" "}
        | |{" "}
        <span
          className="cursor-pointer text-sm text-warning"
          onClick={() => setOrder(pending)}
        >
          Pending payment ({pending.length})
        </span>{" "}
        |{" "}
        <span
          className="cursor-pointer text-sm text-info"
          onClick={() => setOrder(processing)}
        >
          Processing ({processing.length})
        </span>{" "}
        |{" "}
        <span
          className="cursor-pointer text-sm text-success"
          onClick={() => setOrder(complete)}
        >
          Complete ({complete.length})
        </span>{" "}
        |{" "}
        <span
          className="cursor-pointer text-sm text-error"
          onClick={() => setOrder(canceled)}
        >
          Canceled ({canceled.length})
        </span>
      </p>
      <div className="flex pt-1 ">
        <select
          className="select-sm mr-3 select bg-base-100"
          {...register("color", { required: true })}
        >
          <option selected>black</option>
          <option>gray</option>
          <option>desert</option>
        </select>
        <select
          className="select-sm mr-3 select bg-base-100"
          {...register("size", { required: true })}
        >
          <option selected>long</option>
          <option>small</option>
        </select>
        <select
          className="select-sm mr-3 select bg-base-100"
          {...register("delivery", { required: true })}
        >
          <option selected>Regular</option>
          <option>Express</option>
        </select>
      </div>
      <div className="pt-2">
        <table className="table-fixed w-full h-60">
          <thead className="">
            <tr className="border-2 border-sky-500  border-x-0 ">
              <th className="">No</th>
              <th className="">parts-Type</th>
              <th className="">gun-Type</th>
              <th className="">lot-size</th>
              <th className="">Total</th>
              <th className="">status</th>
              <th className="">payment</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {order.length !== 0 &&
              order.map((e, index) => (
                <tr key={e._id} className="border border-gray-500  border-x-0 ">
                  <th className="">{index + 1}</th>
                  <th className="">{e?.product?.partsType}</th>
                  <th className="">{e?.product?.gunType}</th>
                  <th className="">
                    <label
                      onClick={() => setlot(e)}
                      htmlFor="lot-modal"
                      className="btn modal-button"
                    >
                      {e.lot} (see)
                    </label>
                  </th>
                  <th className="">{e.total}</th>
                  <th className="">{e.status}</th>
                  <th className="">
                    {e.status === "pending" ? (
                      <button
                        onClick={() => actionItem(e, "processing")}
                        className="btn btn-sm bg-green  px-4 p-0 m-0"
                        type="submit"
                      >
                        <i className="fa-solid fa-sack-dollar text-black"></i>
                      </button>
                    ) : (
                      "paid"
                    )}
                  </th>
                  <th className="">
                    <button
                      onClick={() => actionItem(e, "canceled")}
                      className="btn btn-sm bg-base-100  px-4 p-0 m-0"
                      type="submit"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <OrderModal data={lot}></OrderModal>
    </div>
  );
};

export default Order;
