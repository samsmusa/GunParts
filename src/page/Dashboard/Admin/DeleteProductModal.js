import React from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

const DeleteProductModal = ({ id, refetch }) => {
  const closeRefmodal = useRef();

  const deleteItem = () => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
      <input type="checkbox" id="product-delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            ref={closeRefmodal}
            htmlFor="product-delete-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Delete item!</h3>
          <p class="py-4">Want to delete this item ?</p>
          <div class="modal-action">
            <label onClick={deleteItem}  class="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
