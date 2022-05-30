import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import LoadData from "../../hooks/LoadData";
import CommentModal from "./CommentModal";

const Reviews = () => {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState({});
  const [all, setAll] = useState([]);
  const [three, setThree] = useState([]);
  const [two, setTwo] = useState([]);
  const [four, setFour] = useState([]);
  const [five, setFive] = useState([]);
  const [one, setOne] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: item, refetch } = LoadData(
    `https://fathomless-wave-64649.herokuapp.com/reviews/?email=${user?.email}`,
    ["userReview", user?.email]
  );

  useEffect(() => {
    if (item) {
      setAll(item);
      setOne(item.filter((e) => e.rating === "1"));
      setTwo(item.filter((e) => e.rating === "2"));
      setThree(item.filter((e) => e.rating === "3"));
      setFour(item.filter((e) => e.rating === "4"));
      setFive(item.filter((e) => e.rating === "5"));
    }
  }, [item]);

  function deleteItem(id) {
    fetch(`https://fathomless-wave-64649.herokuapp.com/review/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("successfully deleted");
          refetch();
        } else {
          toast.error("something error");
        }
      });
  }
  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div>
          <span className="pr-2 text-xl">Reviews</span>
          <span>
            <button className="btn btn-sm btn-outline">Add review</button>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost h-8 w-40"
            {...register("email")}
            disabled={true}
          />
          <button className="btn btn-sm ml-4 bg-base-100">Search</button>
        </div>
      </div>
      <p className="text-left pt-2">
        {" "}
        <span className="text-sm cursor-pointer" onClick={() => setAll(item)}>
          All ({item?.length})
        </span>{" "}
        |{" "}
        <span
          className="text-sm cursor-pointer text-success"
          onClick={() => setAll(five)}
        >
          5 star ({five.length})
        </span>{" "}
        |{" "}
        <span
          className="text-sm cursor-pointer text-warning"
          onClick={() => setAll(four)}
        >
          4 star ({four.length})
        </span>{" "}
        |{" "}
        <span
          className="text-sm cursor-pointer text-info"
          onClick={() => setAll(three)}
        >
          3 star ({three.length})
        </span>{" "}
        |{" "}
        <span
          className="text-sm cursor-pointer text-warning"
          onClick={() => setAll(two)}
        >
          2 star ({two.length})
        </span>{" "}
        |{" "}
        <span
          className="text-sm cursor-pointer text-error"
          onClick={() => setAll(one)}
        >
          1 star ({one.length})
        </span>
      </p>
      <div className="pt-2">
        <table className="table-fixed w-full h-60">
          <thead className="">
            <tr className="border-2 border-sky-500  border-x-0 ">
              <th className="">No</th>
              <th className="">Name</th>
              <th className="">Image</th>
              <th className="">parts-Type</th>
              <th className="">gun-Type</th>
              <th className="">Rating</th>
              <th className="">Comment</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {all &&
              all.map((e, index) => (
                <tr
                  key={e._id + index}
                  className="border border-gray-500  border-x-0 "
                >
                  <th className="">{index + 1}</th>
                  <th className=" text-xs">
                    <div
                      className="tooltip tooltip-info  tooltip-bottom hover:z-50"
                      data-tip={e?.product?.name}
                    >
                      {e?.product?.name.slice(0, 10)}
                    </div>
                  </th>
                  <th className="">
                    <img
                      className="w-15 h-10"
                      src={e.product.img}
                      alt="weapons parts"
                    />
                  </th>
                  <th className="">{e?.product?.partsType}</th>
                  <th className="">{e?.product?.gunType}</th>

                  <th className="">{e?.rating}</th>
                  <th className=" text-xs">
                    <label
                      onClick={() =>
                        setComment({
                          name: e?.product.name,
                          comment: e?.comment,
                        })
                      }
                      htmlFor="review-modal"
                      className="btn modal-button"
                    >
                      {e?.comment.slice(0, 6) + "..."}
                    </label>
                  </th>
                  <th className="px-4">
                    <button
                      onClick={() => deleteItem(e._id)}
                      className="btn bg-zinc-800 text-white crbtn px-4 p-0 m-0"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CommentModal data={comment}></CommentModal>
    </div>
  );
};

export default Reviews;
