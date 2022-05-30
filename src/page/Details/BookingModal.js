import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

var today = new Date();

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const BookingModal = ({ user, profile, item, product, setItem }) => {
  const closeRef = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    data.product = product;
    data.item = item;
    data.date = date;
    data.lot = item.length;
    data.total = (item.length * parseFloat(product?.cost)).toFixed(2);

    data.status = "pending";
    data.email = profile.email;

    fetch("https://fathomless-wave-64649.herokuapp.com/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("order successfully Confirmed");
          setItem([]);
        }
      });
    closeRef.current.click();
  };
  return (
    <div>
      <input type="checkbox" id="order-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-800">
          <label
            ref={closeRef}
            htmlFor="order-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Confirm Order(<span className="text-xs">{product.name}</span>)
          </h3>
          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 gap-3 justify-items-center mt-2"
          >
            <div className="py-4">
              <table>
                <tbody>
                  {item.length !== 0 &&
                    item.map((e, index) => (
                      <tr
                        key={index + "dfes"}
                        className="border border-gray-500  border-x-0 "
                      >
                        <th className="px-4">{index + 1}</th>
                        <th className="px-4">{e.color}</th>
                        <th className="px-11">{e.size}</th>
                        <th className="px-11">{e.delivery}</th>
                      </tr>
                    ))}
                  <tr className="border border-sky-500  border-x-0 mt-3">
                    <th className="px-4">{product.partsType}</th>
                    <th className="px-4">{product.gunType}</th>
                    <th className="px-4">${product.cost}(per item)</th>
                    <th className="px-4">
                      ${(item.length * parseFloat(product.cost)).toFixed(2)}
                      (Total)
                    </th>
                  </tr>
                </tbody>
              </table>
              <p>Peak Information</p>
              <div className="mt-2">
                <p className="font-code flex flex-row justify-between items-center">
                  <span>
                    <i className="fa-solid fa-phone pr-2"></i>
                    Phone{" "}
                  </span>
                  <span>
                    <input
                      type="number"
                      placeholder="not set yet"
                      className="input rounded-none input-ghost h-8"
                      defaultValue={profile?.phone}
                      {...register("phone", {
                        value: profile?.phone,
                        required: true,
                      })}
                    />
                  </span>
                </p>
                <p className="font-code flex flex-row justify-between items-center">
                  <span>
                    <i className="fa-solid fa-phone pr-2"></i>
                    address{" "}
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder="not set yet"
                      className="input rounded-none input-ghost h-8"
                      defaultValue={profile?.address}
                      // name="address"
                      {...register("address", {
                        value: profile?.address,
                        required: true,
                      })}
                    />
                  </span>
                </p>
                <input
                  disabled={item.length === 0}
                  htmlFor="order-modal"
                  type="submit"
                  value="Submit"
                  className="btn mt-4 text-white btn-wide bg-zinc-800 w-full max-w-xs"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
