import React from "react";

const ReviewCard = ({ data, ishome }) => {
  return (
    <div className="mt-3 p-3 flex border rounded-lg text-sm text-white">
      <div className="avatar col-span-1">
        <div
          className={
            ishome ? "w-24 h-24 rounded-full" : "w-10 h-10 rounded-full"
          }
        >
          <img src={data.profile?.img} alt="avatar" />
        </div>
      </div>

      <div className="w-full ml-4 text-left">
        <p>
          {data.profile.name} (
          {Array.from(Array(parseInt(data.rating)).keys()).map((e) => (
            <i key={e + "gyu"} className="fa-solid fa-star"></i>
          ))}
          {Array.from(Array(5 - parseInt(data.rating)).keys()).map((e) => (
            <i key={e + "dfr"} className="fa-regular fa-star"></i>
          ))}
          )
        </p>
        <p>{ishome ? data.comment.slice(0, 30) : data.comment}</p>
        <div className="flex justify-left">
          <div>
            <p className="text-sm text-info">like</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
