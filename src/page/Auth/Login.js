import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSendEmailVerification,
  useAuthState,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import useProfile from "../../hooks/useProfile";
import LoadData from "../../hooks/LoadData";
import Progress from "../../components/Progress/Progress";
import { useState } from "react";
import Token from "../../hooks/Token";

var counter = 0;

const Login = () => {
  const navigate = useNavigate();
  const [muser, mloading, merror] = useAuthState(auth);
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [emailAcc, setEmailAcc] = useState("");
  
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    setEmailAcc(data.email);
    counter = 0;
  };

  if (error && counter === 0) {
    counter++;
    toast.error(error.message);
  }

  if (user && counter === 0) {
    Token(emailAcc);
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
            },
            body: JSON.stringify(data),
          }).then((res) => res.json());
        }
      });
  }

  if (user || guser || muser) {
    if (counter === 0) {
      counter += 1;
      toast.success(`successfully login a user`);

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
    }
    let from = location.state?.from?.pathname || "/";

    navigate(from, { replace: true });
  }

  return (
    <div className="bg-[url('https://i.ibb.co/st6b8gb/image-1.jpg')]">
      <div className="container  mx-auto pt-5">
        <h3 className="font-cursive text-7xl">Login</h3>
        <div className="form-control mx-3 h-full grid grid-cols-1 md:grid-cols-5 pb-11">
          <div className="col-span-1 w-full"></div>
          <div className="col-span-3">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                Sign in
              </button>
            </form>
            <div className="divider ">or</div>
            <button
              onClick={() => signInWithGoogle()}
              className="pt-3 bg-zinc-800 btn btn-wide w-full pb-3 mb-4"
            >
              <i className="fa-brands fa-google"></i>{" "}
              <span className="ml-4 text-white">Google Login</span>
            </button>
            <div className="border border-sky-400 border-x-0"></div>
            <p className="text-xl">
              Haven't an Account ? Please{" "}
              <Link to="/register" className="text-accent">
                sign up
              </Link>
            </p>
          </div>
          <div className="md:col-span-1 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
