import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
  useSendEmailVerification,
  useAuthState,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Token from "../../hooks/Token";

let counter = 0;
const Register = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});

  const [muser, mloading, merror] = useAuthState(auth);
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, uerror] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [updateProfile, updating, perror] = useUpdateProfile(auth);

  const onSubmit = async (data) => {
    counter = 0;
    setProfileData(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    // if (!uerror) {
    //   Token(data.email);
    // };
  };
  if (uerror && counter === 0) {
    counter++;
    toast.error(uerror.message);
  }

  if (user && counter === 0) {
    Token(profileData.email);
    counter += 1;
    const data = profileData;
    data.img = `https://ui-avatars.com/api/?background=FF00FF&color=fff&size=328&name=${data.name.replace(
      " ",
      "+"
    )}`;
    fetch("https://fathomless-wave-64649.herokuapp.com/user", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ ...data, role: "client" }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(`successfully create a user ${user.user.email}`);
        if (!user?.user?.emailVerified) {
          toast.warning(
            <div
              className="btn btn-sm "
              onClick={async () => {
                await sendEmailVerification();
                alert("Sent email");
              }}
            >
              Verify email
            </div>
          );
        }
      });
  }

  if (guser?.user?.email) {
    Token(guser?.user?.email);
    fetch(
      `https://fathomless-wave-64649.herokuapp.com/user/${guser?.user?.email}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== "success") {
          const data = {
            name: guser.user.displayName,
            email: guser.user.email,
            img: guser.user.photoURL,
            role: "client",
          };
          fetch("https://fathomless-wave-64649.herokuapp.com/user", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(data),
          }).then((res) => res.json());
        }
      });
  }

  if (guser || muser || user) {
    navigate("/");
    // window.location.reload();
  }
  return (
    <div className="bg-[url('https://i.ibb.co/st6b8gb/image-1.jpg')]">
      <div className="container  mx-auto pt-5">
        <h3 className="font-cursive text-7xl">Register</h3>
        <div className="form-control mx-3 h-full grid grid-cols-1 md:grid-cols-5 pb-11">
          <div className="col-span-1 w-full"></div>
          <div className="col-span-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="justify-center text-xl pt-5">
                <span className="block text-left">Your Name</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className={
                    errors.name
                      ? "input input-bordered input-error w-full "
                      : "input input-bordered input-info w-full "
                  }
                  {...register("name", { required: true })}
                />
                <span className="block text-error text-left">
                  {errors.name && "Last name is required"}
                </span>
              </div>
              <div className="justify-center text-xl pt-5">
                <span className="block text-left">Email</span>
                <input
                  type="text"
                  placeholder="Type here"
                  className={
                    errors.email
                      ? "input input-bordered input-error w-full "
                      : "input input-bordered input-info w-full "
                  }
                  {...register("email", { required: true })}
                />
                <span className="block text-error text-left">
                  {errors.email && "Email is required"}
                </span>
              </div>
              <div className="justify-center text-xl pt-5">
                <span className="block text-left">Password</span>
                <input
                  type="password"
                  placeholder="Type here"
                  className={
                    errors.password
                      ? "input input-bordered input-error w-full "
                      : "input input-bordered input-info w-full "
                  }
                  {...register("password", { required: true })}
                />
                <span className="block text-error text-left">
                  {errors.password && "password is required"}
                </span>
              </div>
              <button
                type="submit"
                className="mt-3 bg-base-100 btn btn-wide w-full"
              >
                Sign up
              </button>
            </form>
            <div className="divider ">or</div>
            <button
              onClick={() => signInWithGoogle()}
              className="pt-3 bg-base-100 btn btn-wide w-full pb-3 mb-4"
            >
              <i className="fa-brands fa-google"></i>{" "}
              <span className="ml-4">Google Login</span>
            </button>
            <div className="border border-sky-400 border-x-0"></div>
            <p className="text-xl">
              Have an Account ? Please{" "}
              <Link to="/login" className="text-accent">
                login
              </Link>
            </p>
          </div>
          <div className="md:col-span-1 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
