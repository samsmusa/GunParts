import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Progress from "../../components/Progress/Progress";
import Imgbb from "../../hooks/Imgbb";
import useProfile from "../../hooks/useProfile";
import LoadData from "../../hooks/LoadData";

const Profile = () => {
  const [isEdit, setisEdit] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const profile = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isEdit) {
      data.email = user.email;
      if (data.image.length !== 0) {
        const img = await Imgbb(data.image[0]);
        data.img = img;
      }

      const { image, ...obj } = data;
      fetch("https://fathomless-wave-64649.herokuapp.com/user", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(obj),
      }).then((res) => res.json());

      setisEdit(false);
      window.location.reload();
    } else {
      setisEdit(true);
    }
  };
  if (loading || !profile) {
    return <Progress />;
  }
  return (
    <div>
      <div className="bg-zinc-800 text-white">
        <div className="container mx-auto pt-7 grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                onClick={handleSubmit(onSubmit)}
                className="badge cursor-pointer badge-secondary"
              >
                {!isEdit ? "edit" : "save"}
              </div>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={image ? image : profile?.img} alt="avatar" />
                </div>
              </div>
              {isEdit && (
                <div className="py-3">
                  <input
                    type="file"
                    className="filetype "
                    {...register("image", {
                      onChange: onImageChange,
                    })}
                  />
                </div>
              )}
              <div className="pb-6 font-semibold">
                <p className="font-code ">{user?.displayName}</p>
                <p className="font-code">
                  <input
                    disabled={!isEdit}
                    type="text"
                    placeholder="not set yet"
                    className="input font-bold input-bordered input-bg-zinc-900  disabled:opacity-100 h-8"
                    defaultValue={profile?.job}
                    {...register("job")}
                  />
                </p>
              </div>
              <p className="font-code flex flex-row justify-between items-center">
                <span>
                  <i className="fa-solid fa-phone pr-2"></i>
                  Phone{" "}
                </span>
                <span>
                  <input
                    disabled={!isEdit}
                    type="text"
                    placeholder="not set yet"
                    className="input disabled:opacity-100 font-bold input-bordered input-bg-zinc-900  h-8"
                    defaultValue={profile?.phone}
                    {...register("phone")}
                  />
                </span>
              </p>
              <p className="font-code flex flex-row justify-between items-center">
                <span>
                  <i className="fa-solid fa-envelope pr-2"></i>
                  Email{" "}
                </span>
                <span>
                  <input
                    type="text"
                    placeholder="not set yet"
                    className="input font-bold input-bordered input-bg-zinc-900  h-8"
                    defaultValue={user?.email}
                    {...register("email")}
                    disabled={true}
                  />
                </span>
              </p>
              <p className="font-code flex flex-row justify-between items-center">
                <span>
                  <i className="fa-solid fa-location pr-2"></i>
                  Address{" "}
                </span>
                <span>
                  <input
                    disabled={!isEdit}
                    type="text"
                    placeholder="not set yet"
                    className="input font-bold input-bordered  h-8"
                    defaultValue={profile?.address}
                    {...register("address")}
                  />
                </span>
              </p>
              <p className="text-left text-md text-white my-3">Usefull Links</p>
              <div className="drop-shadow-xl text-left  pl-4">
                <p className="font-code flex flex-row justify-between items-center">
                  <span>
                    <i className="fa-brands fa-github pr-2 "></i>
                    Github{" "}
                  </span>
                  <span>
                    <input
                      disabled={!isEdit}
                      type="text"
                      placeholder="not set yet"
                      className="input font-bold input-bordered input-bg-zinc-900  h-8"
                      defaultValue={profile?.github}
                      {...register("github")}
                    />
                  </span>
                </p>
                <p className="font-code flex flex-row justify-between items-center">
                  <span>
                    <i className="fa-brands fa-facebook pr-2"></i>
                    Facebook{" "}
                  </span>
                  <span>
                    <input
                      disabled={!isEdit}
                      type="text"
                      placeholder="not set yet"
                      className="input font-bold input-bordered input-bg-zinc-900  h-8"
                      defaultValue={profile?.facebook}
                      {...register("facebook")}
                    />
                  </span>
                </p>
                <p className="font-code flex flex-row justify-between items-center">
                  <span>
                    <i className="fa-solid fa-globe pr-2"></i>
                    Website{" "}
                  </span>
                  <span>
                    <input
                      disabled={!isEdit}
                      type="text"
                      placeholder="not set yet"
                      className="input font-bold input-bordered input-bg-zinc-900  h-8"
                      defaultValue={profile?.website}
                      {...register("website")}
                    />
                  </span>
                </p>
              </div>
            </form>
          </div>
          <div className="col-span-4">
            <p className="font-code text-left text-xl">Notifications</p>
            <div className="px-4 font-code mb-3">
              <ul className="list-disc list-inside">
                <li>
                  Now this is a story all about how, my life got flipped turned
                  upside down
                </li>
                <li>
                  Now this is a story all about how, my life got flipped turned
                  upside down
                </li>
                <li>
                  Now this is a story all about how, my life got flipped turned
                  upside down
                </li>
              </ul>
            </div>
            <p className="font-code text-left text-xl">Messages</p>
            <div className="px-4 font-code text-left">
              <div
                tabIndex="0"
                className="collapse collapse-arrow border-2 border-x-0 border-base-300 rounded-box"
              >
                <div className="collapse-title text-xl font-Bold">
                  Pablo Escobar
                </div>
                <div className="collapse-content">
                  <p>Life is full of surprises, some good, some not so good.</p>
                </div>
              </div>
              <div
                tabIndex="0"
                className="collapse collapse-arrow border-2 border-base-300 border-x-0"
              >
                <div className="collapse-title text-xl font-Bold">
                  John Gotti
                </div>
                <div className="collapse-content">
                  <p>
                    Don't carry a gun. It's nice to have them close by, but
                    don't carry them
                  </p>
                </div>
              </div>
              <div
                tabIndex="0"
                className="collapse collapse-arrow border-2 border-base-300 border-x-0"
              >
                <div className="collapse-title text-xl font-Bold">
                  Salvatore Riina
                </div>
                <div className="collapse-content">
                  <p>
                    What good is having the right to sit at a lunch counter if
                    you can't afford to buy a hamburger
                  </p>
                </div>
              </div>
              <div
                tabIndex="0"
                className="collapse collapse-arrow border-2 border-base-300 border-x-0"
              >
                <div className="collapse-title text-xl font-Bold">
                  Musa Bin Shamsher
                </div>
                <div className="collapse-content">
                  <p>
                    Tk. 96,000 crore deposited with the bank. Bangladesh would
                    be benefitted if we can get back the money
                  </p>
                </div>
              </div>
              <div
                tabIndex="0"
                className="collapse collapse-arrow border-2 border-base-300 border-x-0"
              >
                <div className="collapse-title text-xl font-Bold">
                  dawood ibrahim
                </div>
                <div className="collapse-content">
                  <p>
                    He had just about enough intelligence to open his mouth when
                    he wanted to eat, but certainly no more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
