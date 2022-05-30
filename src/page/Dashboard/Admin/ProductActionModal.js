import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Imgbb from "../../../hooks/Imgbb";
import useShowImage from "../../../hooks/useShowImage";

var today = new Date();

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const ProductActionModal = ({ product, profile, refetch, setEdititem }) => {
  const closeRef = useRef();
  const { image, setImage, onImageChange } = useShowImage();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    data.img = product.img;
    if (data.image.length !== 0) {
      const img = await Imgbb(data.image[0]);
      data.img = img;
    }
    data._id = product._id;

    const { image, ...body } = data;

    fetch("https://fathomless-wave-64649.herokuapp.com/product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Proudct  successfully Added");
          refetch();
          reset();
          setEdititem({});
          setImage(null);
        }
      });
    closeRef.current.click();
  };
  return (
    <div>
      <input type="checkbox" id="product-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box w-11/12 max-w-5xl bg-slate-800">
          <label
            ref={closeRef}
            htmlFor="product-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            {product?.name
              ? "Edit Product (" + product?.name + ")"
              : "Add Product"}
          </h3>
          <img
            className="mx-auto"
            src={
              image
                ? image
                : product?.img
                ? product?.img
                : "https://static.wikia.nocookie.net/anthemgame/images/b/b0/Weapon_Master-default.png/revision/latest/top-crop/width/360/height/450?cb=20200422114823"
            }
            alt="product-ima"
          />
          <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 gap-3 justify-items-center mt-2"
          >
            <div className="py-4">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        defaultValue={product?.name}
                        className="input input-sm text-black font-semibold input-bordered w-full max-w-xs"
                        {...register("name", {
                          required: true,
                        })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Gun Type:</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        defaultValue={product?.gunType}
                        className="input input-sm text-black font-semibold input-bordered w-full max-w-xs"
                        {...register("gunType", {
                          required: true,
                        })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Parts :</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        defaultValue={product?.partsType}
                        className="input input-sm text-black font-semibold input-bordered w-full max-w-xs"
                        {...register("partsType", {
                          required: true,
                        })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Cost :</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        defaultValue={product?.cost}
                        className="input input-sm text-black font-semibold input-bordered w-full max-w-xs"
                        {...register("cost", {
                          required: true,
                        })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Time :</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        defaultValue={product?.time}
                        className="input input-sm text-black font-semibold input-bordered w-full max-w-xs"
                        {...register("time", {
                          required: true,
                        })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Description :</td>
                    <td>{"   "}</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Type here"
                        defaultValue={product.description}
                        className="textarea textarea-bordered w-full max-w-xs text-black font-semibold"
                        {...register("description", {
                          required: true,
                        })}
                      ></textarea>
                    </td>
                  </tr>
                  <tr className="mt-2">
                    <td>Image :</td>
                    <td>{"   "}</td>
                    <td>
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                        {...register("image", {
                          onChange: onImageChange,
                        })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <input
                  id="close-modal"
                  htmlFor="product-modal"
                  type="submit"
                  value={product?.name ? "edit" : "Add New"}
                  className="btn mt-4 btn-wide bg-zinc-900 text-white w-full max-w-xs"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductActionModal;
