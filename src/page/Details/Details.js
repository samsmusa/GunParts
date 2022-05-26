import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import HomeCart from "../Shared/HomeCart";
import useProfile from "../../hooks/useProfile";
import BookingModal from "./BookingModal";
import PostReview from "./PostReview";
import ReviewCard from "./ReviewCard";
import LoadData from "../../hooks/LoadData";
import Progress from "../../components/Progress/Progress";

const Details = () => {
  const profile = useProfile();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://fathomless-wave-64649.herokuapp.com/product/${id}`)
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, [id]);

  const [related, setRelated] = useState([]);
  useEffect(() => {
    fetch(
      `https://fathomless-wave-64649.herokuapp.com/products/?parts=${product.partsType}`
    )
      .then((res) => res.json())
      .then((res) => setRelated(res));
  }, [product]);

  const [item, setItem] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const deleteItem = (inx) => {
    const values = [...item];
    setItem(values.filter((e, index) => index !== inx));
  };

  const onSubmit = (data) => {
    setItem([...item, data]);
  };

  const {
    isLoading,
    error,
    data: reviews,
    refetch,
  } = LoadData(
    `https://fathomless-wave-64649.herokuapp.com/reviews/?product=${id}`,
    ["reviewData", id]
  );
  if (isLoading) {
    return <Progress />;
  }
  return (
    <div>
      <div className="bg-zinc-900">
        <div className="container mx-auto ">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>{product.name}</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1">
            <figure>
              <img src={product.img} alt="product-image" />
            </figure>
          </div>
          <div className="col-span-2 px-5 text-left">
            <h3 className="text-3xl font-cursive">{product.name}</h3>
            <div className="font-cursive">
              <p>Gun: {product.gunType}</p>
              <p>parts: {product.partsType}</p>
              <p>cost: {product.cost}</p>
            </div>

            {!profile && (
              <p className="text-xl text-warning">
                please login to make a order
              </p>
            )}

            <div className="pt-4">
              <p>Make a Order</p>

              {profile?.role !== "admin" ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <table className="table-fixed">
                    <thead className="px-4">
                      <tr className="border-2 border-sky-500  border-x-0 ">
                        <th className="pl-4">
                          <select
                            className="select-sm select max-w-xs bg-transparent"
                            {...register("color", { required: true })}
                            defaultValue={"black"}
                          >
                            <option>Black</option>
                            <option>Gray</option>
                            <option>Desert</option>
                          </select>
                        </th>
                        <th>
                          <select
                            className="select-sm select max-w-xs bg-transparent"
                            {...register("size", { required: true })}
                            defaultValue={"Long"}
                          >
                            <option>Long</option>
                            <option>Short</option>
                          </select>
                        </th>
                        <th>
                          <select
                            className="select-sm select max-w-xs bg-transparent"
                            {...register("delivery", { required: true })}
                            defaultValue={"Regular"}
                          >
                            <option>Regular</option>
                            <option>Express</option>
                          </select>
                        </th>
                        <th className="px-4">
                          <button
                            className="btn btn-sm cbtn bg-base-100"
                            type="submit"
                            disabled={item.length === 4 && true}
                          >
                            Add
                          </button>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </form>
              ) : (
                <p className="text-warning">
                  Admin cannot make a order. Please change Role from{" "}
                  <Link to="/profile" className="text-info">
                    Profile
                  </Link>
                </p>
              )}
            </div>

            {profile?.role !== "admin" && (
              <div className="mt-5">
                <p> your order Projection:</p>
                <table className="table-fixed w-full h-60">
                  <thead className="px-4 ">
                    <tr className="border-2 border-sky-500  border-x-0 ">
                      <th className="pl-4">No</th>
                      <th className="pl-4">Color</th>
                      <th className="px-11">Size</th>
                      <th className="px-11">Delivery</th>
                      <th className="px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.length !== 0 &&
                      item.map((e, index) => (
                        <tr
                          key={index + "dfdgr"}
                          className="border border-gray-500  border-x-0 "
                        >
                          <th className="px-4">{index + 1}</th>
                          <th className="px-4">{e.color}</th>
                          <th className="px-11">{e.size}</th>
                          <th className="px-11">{e.delivery}</th>
                          <th className="px-4">
                            <button
                              onClick={() => deleteItem(index)}
                              className="btn bg-base-100 crbtn px-4 p-0 m-0"
                              type="submit"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </th>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <p className="flex flex-row justify-between mt-4">
                  <span>
                    Total Cost: $
                    {(item.length * parseFloat(product.cost)).toFixed(2)}
                  </span>
                  <label
                    disabled={item.length === 0 || !profile}
                    htmlFor="order-modal"
                    className=" mx-2 btn btn-sm  btn-success cbtn modal-button"
                  >
                    Place Order
                  </label>
                </p>
              </div>
            )}
          </div>
          <div className="col-span-3 text-left">
            <p className="text-xl font-cursive text-white underline decoration-sky-500 decoration-2 underline-offset-8">
              Product Description:
            </p>
            <div className="divider"></div>
            <p className="font-cursive">{product.description}</p>
            <div className="divider"></div>
          </div>
          {profile?.role === "admin" && (
            <p className="text-left text-warning">
              {" "}
              Admin cannot post a review
            </p>
          )}
          {!profile && (
            <p className="text-left text-warning">
              {" "}
              Please login to post a review!
            </p>
          )}
          <div
            className={
              profile?.role === "admin" || !profile
                ? " opacity-50 col-span-3 text-left mb-4"
                : "col-span-3 text-left mb-4"
            }
          >
            <h3 className="font-cursive text-2xl">Post a Review</h3>
            <div className="divider col-span-3"></div>
            <PostReview product={product} refetch={refetch} />
          </div>
          <div className="divider col-span-3"></div>
          <div className="col-span-3 text-left">
            <h3 className="font-cursive text-2xl">
              Reviews ({reviews && reviews.length})
            </h3>
            <div className="divider"></div>
            <div className="">
              {reviews &&
                reviews.map((e) => (
                  <ReviewCard key={e._id} data={e} ishome={false} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="font-cursive text-5xl ">Related Products</h3>
        <div className="bg-zinc-900 ">
          <div className="pt-5 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {related.slice(0, 6).map((item) => (
              <HomeCart item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>

      {/* modal */}
      <BookingModal
        profile={profile}
        item={item}
        setItem={setItem}
        product={product}
      />
      {/* modal */}
    </div>
  );
};

export default Details;
