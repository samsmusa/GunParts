import React from "react";
import { Link } from "react-router-dom";

const HomeCart = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            src={item.img}
            alt="Shoes"
            style={{ height: "200px", width: "400px" }}
          />
        </figure>
        <div className="">
          <div className="divider m-0 p-0"></div>
          <h2 className="text-center text-white m-0 p-0">{item.partsType}</h2>
          <div className="divider m-0 p-0"></div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCart;
