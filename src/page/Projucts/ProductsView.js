import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Progress from "../../components/Progress/Progress";
import LoadData from "../../hooks/LoadData";
import ProductCard from "./ProductCard";

const ProductsView = () => {
  const [rated, setRated] = useState([]);
  const { data: products, refetch } = LoadData(
    "http://localhost:5000/products",
    ["allProducts"]
  );
  const {
    data: reviews,
    refetch: refetch2,
    isLoading,
  } = LoadData("http://localhost:5000/reviews", ["allreviews"]);
  useEffect(() => {
    if (reviews) {
      setRated(
        reviews.map((e) => {
          if (parseInt(e.rating) > 2) {
            return e.product._id;
          }
        })
      );
    }
  }, [reviews]);
  if (isLoading) {
    return <Progress />;
  }
  return (
    <div>
      <div className="relative">
        <p className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-xl md:text-4xl text-sky-700 text-center font-cursive">
          {" "}
          Guns dont kill people, people with guns kill people!!!{" "}
        </p>
        <figure className="mx-auto">
          <img
            src="https://i.ibb.co/mRTZcVX/5762f2a18a6a9a33b03f532842bd1b44.jpg"
            className="rounded-xl w-full h-80 mx-auto"
            alt="gun"
          />
        </figure>
      </div>
      <div className="bg-zinc-900">
        <div className="divider m-0 p-0 "></div>
        <p className="font-cursive text-5xl">Our Products</p>
        <div className="divider m-0 p-0 "></div>
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center items-stretch">
          {products &&
            products.map((e) => (
              <ProductCard rated={rated} key={e._id} item={e} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
