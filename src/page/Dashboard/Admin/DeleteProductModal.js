import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

const DeleteProductModal = ({ id, refetch }) => {
  const closeRefmodal = useRef();

  const deleteItem = () => {
    fetch(`https://fathomless-wave-64649.herokuapp.com/product/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Proudct  successfully Deleted");
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
      <input
        type="checkbox"
        id="product-delete-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom  sm:modal-middle">
        <div className="modal-box bg-slate-800">
          <label
            ref={closeRefmodal}
            htmlFor="product-delete-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Delete item!</h3>
          <p className="py-4">Want to delete this item ?</p>
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

export default DeleteProductModal;
