import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item, rated }) => {
  return (
    <div className="card w-full md:w-60 bg-gray-800 shadow-xl relative">
      {rated.includes(item._id) && (
        <div className="badge badge-success gap-2 absolute top-1/4 left-0">
          <i className="fa-solid fa-bolt fr-2"></i>
          rated
        </div>
      )}
      <figure className="px-10 pt-10 ">
        <img src={item.img} alt="Shoes" className="rounded-xl w-30" />
      </figure>
      <div className="card-body  items-center text-center ">
        <h2 className="card-title text-xs">{item.name}</h2>
        <div className="divider m-0 p-0"></div>
        <p className="font-cursive m-0 p-0">{item.partsType}</p>
        <div className="divider divide-white  border-gray-100 m-0 p-0 "></div>
        <div className="card-actions">
          <Link to={`/product/${item._id}`}>
            <button className="btn btn bg-gray-500 ">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
