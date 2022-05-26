import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Progress from "../../../components/Progress/Progress";
import auth from "../../../firebase.init";
import LoadData from "../../../hooks/LoadData";
import OrderModal from "../OrderModal";

const AdminOrder = () => {
  const [user, loading, autherror] = useAuthState(auth);
  const [order, setOrder] = useState([]);
  const [processing, setprocessing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [pending, setpending] = useState([]);

  const {
    data: all,
    refetch,
    isLoading,
  } = LoadData("https://fathomless-wave-64649.herokuapp.com/orders", [
    "AdminuserOrder",
    user?.email,
  ]);

  const [lot, setlot] = useState([]);
  const actionItem = (product, status) => {
    product.status = status;
    fetch("https://fathomless-wave-64649.herokuapp.com/order", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer `,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
      });
    refetch();
  };

  useEffect(() => {
    if (!!all) {
      setOrder(all);
      setprocessing(all.filter((e) => e.status === "processing"));
      setCanceled(all.filter((e) => e.status === "canceled"));
      setComplete(all.filter((e) => e.status === "complete"));
      setpending(all.filter((e) => e.status === "pending"));
    }
  }, [all]);
  const classCreate = (status) => {
    let classname;
    switch (status) {
      case "pending":
        classname = "border border-amber-400  border-x-0 ";
        break;
      case "processing":
        classname = "border border-sky-500  border-x-0 ";
        break;
      case "canceled":
        classname = "border border-rose-500  border-x-0 ";
        break;
      case "complete":
        classname = "border border-green-500  border-x-0 ";
        break;
      default:
        classname = "border border-gray-500  border-x-0 ";
    }
    return classname;
  };
  if (isLoading || loading) {
    return <Progress />;
  }

  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div>
          <span className="pr-2 text-xl">Orders</span>
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
          defaultValue={"black"}
        >
          <option>gblack</option>
          <option>gray</option>
          <option>desert</option>
        </select>
        <select
          className="select-sm mr-3 select bg-base-100"
          defaultValue={"long"}
        >
          <option>long</option>
          <option>small</option>
        </select>
        <select
          className="select-sm mr-3 select bg-base-100"
          defaultValue={"Refular"}
        >
          <option>Regular</option>
          <option>Express</option>
        </select>
      </div>
      <div className="pt-2">
        <table className="table-auto w-full h-60">
          <thead className="">
            <tr className="border-2 border-sky-500  border-x-0 ">
              <th className="">No</th>
              <th className="">user</th>
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
                <tr key={e._id} className={classCreate(e.status)}>
                  <th className="">{index + 1}</th>
                  <th className="">{e?.email}</th>
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
                    {e.status === "processing" ? "paid" : "unpaid"}
                  </th>
                  <th className="">
                    {e.status === "processing" && (
                      <div
                        className="tooltip tooltip-info  tooltip-top"
                        data-tip="confirm ?"
                      >
                        <button
                          onClick={() => actionItem(e, "complete")}
                          className="btn btn-sm bg-base-100 bg-green  mx-1 p-0 m-0 px-2"
                          type="submit"
                        >
                          <i className="fa-solid text-black fa-check"></i>
                        </button>
                      </div>
                    )}
                    {e.status === "processing" && (
                      <div
                        className="tooltip tooltip-error  tooltip-top"
                        data-tip="calcel ?"
                      >
                        <button
                          onClick={() => actionItem(e, "canceled")}
                          className="btn btn-sm bg-base-100  mx-1 p-0 m-0 px-2"
                          type="submit"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    )}
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

export default AdminOrder;
