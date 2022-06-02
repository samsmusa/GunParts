import React from "react";
import { Link } from "react-router-dom";

const HomeCart = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="card card-compact bg-gray-700 shadow-xl">
        <figure>
          <img
            src={item.img}
            alt="Shoes"
            style={{ height: "200px", width: "400px" }}
          />
        </figure>
        <div className="">
          <div className="divider m-0 p-0"></div>
          <h2 className="text-center text-white m-0 p-0">{item.name}</h2>
          <h2 className="text-center text-white m-0 p-0">{item.partsType}</h2>
        <p className="font-cursive m-0 p-0">{item?.description.slice(0,40)+'...'}</p>
          <h2 className="text-center text-white m-0 p-0">${item.cost}</h2>
          <label className="btn ">Order Now</label>
          <div className="divider m-0 p-0"></div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCart;
