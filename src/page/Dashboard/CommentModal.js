import React from "react";

const CommentModal = ({ data }) => {
  return (
    <div>
      <input type="checkbox" id="review-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-slate-800">
          <h3 className="font-bold text-lg">{data.name}</h3>
          <p>{data?.comment}</p>
          <div className="modal-action">
            <label htmlFor="review-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
