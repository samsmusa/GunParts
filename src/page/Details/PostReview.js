import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useProfile from '../../hooks/useProfile';


var today = new Date();

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();


const PostReview = ({ product, refetch }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [profile] = useProfile();

  const onSubmit = (data) => {
    data.profile = profile;
    data.product = product;
    data.date = date;
    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success("Thanks for review");
          refetch();
        }
      });
    
  };

  return (
    <div className="flex">
      <div className="avatar col-span-1">
        <div className="w-24 h-24 rounded-full">
          <img src={profile?.img} alt="avatar" />
        </div>
      </div>

      <div className="w-full ml-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="say somethig"
            className={
              errors.comment
                ? "textarea  w-full textarea-error m-2 resize-x"
                : "textarea  w-full textarea-bordered m-2 resize-x"
            }
            {...register("comment", { required: true })}
          ></textarea>
          <div className="flex justify-between">
            <div className="rating">
              <input
                type="radio"
                className="mask mask-star"
                value="1"
                {...register("rating", { required: true })}
              />
              <input
                type="radio"
                className="mask mask-star"
                value="2"
                {...register("rating", { required: true })}
              />
              <input
                type="radio"
                className="mask mask-star"
                value="3"
                {...register("rating", { required: true })}
              />
              <input
                type="radio"
                className="mask mask-star"
                value="4"
                {...register("rating", { required: true })}
              />
              <input
                type="radio"
                className="mask mask-star"
                value="5"
                {...register("rating", { required: true })}
              />

              {errors.rating && (
                <span className=" text-warning">( rating is required )</span>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-sm">
                post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostReview;