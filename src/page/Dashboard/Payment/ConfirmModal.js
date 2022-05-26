import React from "react";

const ConfirmModal = ({ transationId }) => {
  return (
    <div>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <label htmlFor="confirm-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations Your payment successfully done!
          </h3>
          <p className="py-4"> Your transaction Id is {transationId}</p>
        </label>
      </label>
    </div>
  );
};

export default ConfirmModal;
