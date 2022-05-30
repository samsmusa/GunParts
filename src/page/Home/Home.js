import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadData from "../../hooks/LoadData";
import ReviewCard from "../Details/ReviewCard";
import HomeCart from "../Shared/HomeCart";
import Carusel from "./Carusel/Carusel";
const Home = () => {
  const [serveice, setService] = useState([]);

  const { data: reviews } = LoadData(
    "https://fathomless-wave-64649.herokuapp.com/reviews",
    ["homeReviews"]
  );
  useEffect(() => {
    fetch("https://fathomless-wave-64649.herokuapp.com/products")
      .then((res) => res.json())
      .then((res) => setService(res));
  }, []);
  // if (reviews) {
  //   setAllReviews(reviews.reverse());
  // }

  return (
    <div className="bg-transparent font-cursive">
      <Carusel></Carusel>

      {/* special item section  */}
      <div className="px-12 py-3 grid grid-cols-1 md:grid-cols-3 gap-4 border-solid border border-x-0 border-sky-500 bg-transparent">
        <div className="animate-pulse py-1 card bg-transparent w-96 shadow-xl flex flex-row">
          <figure>
            <img
              src="https://media.istockphoto.com/photos/police-officer-with-weapons-picture-id493027546?k=20&m=493027546&s=612x612&w=0&h=oVBAoSjdARwvcH2TGcPOp4xGihsL5hc_okujerz538U="
              alt="Shoes"
            />
          </figure>
          <div className="">
            <h2 className="text-lg text-white font-cursive">
              Gun!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive">
              One man with a gun can control 100 without one?
            </p>
          </div>
        </div>
        <div className="animate-pulse py-1 card bg-transparent w-96 shadow-xl flex flex-row">
          <figure>
            <img
              src="https://media.istockphoto.com/photos/black-silhouette-of-soldiers-picture-id675897430?k=20&m=675897430&s=612x612&w=0&h=YZKSyQdujW7oqFWV1lKGDormaTvmkph36QWfV8clbMw="
              alt="Shoes"
            />
          </figure>
          <div className="">
            <h2 className="text-lg text-white font-cursive">
              Firing Pin!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive">Your genetics load the gun!</p>
          </div>
        </div>
        <div className="animate-pulse py-1 card bg-transparent w-96 shadow-xl flex flex-row">
          <figure>
            <img
              src="https://i2-prod.mirror.co.uk/incoming/article10545409.ece/ALTERNATES/s615/PROD-EMBARGOED-FOR-RELEASE-UNTIL-1700-hrs-29-MAY-2014-WINNERS-OF-ROYAL-NAVY-PHOTOGRAPHIC-COMPETITION.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="">
            <h2 className="text-lg text-white font-cursive">
              Sear Spring!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive text-gray-300">
              A gun is no more dangerous than a cricket bat in the hands of a
              madman.
            </p>
          </div>
        </div>
      </div>
      {/* special item section  */}

      {/* who we are  */}
      <div className="bg-zinc-900 pb-3">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 pt-4">
          <div className="md:col-span-2">
            <h3 className="font-cursive text-5xl text-white">Who we are</h3>
            <p className="text-left leading-relaxed text-xl">
              We serve the gun community by providing the largest assortment of
              hard-to-find firearms parts and accessories. Our specialty resides
              in acquiring and selling modern and obsolete original and
              replacement gun parts from all major manufacturers.
              <span className="block py-3 border-2 pl-4 border-y-0 border-sky-500 text-white">
                We also provide the largest collection of gun schematics
                available. PistolBD Gun Parts Corporation is located at the foot
                of the scenic Catskill Mountains and supplies vintage and
                obsolete gun parts to the U.S.and Canada.
              </span>
              We support America’s firearm legacy by supplying the parts that
              fix, restore, improve, and complete every gun, regardless of when
              or where it was made.
            </p>
            <div className="flex flex-row content-start">
              <Link to="/about">
                <button className="transition duration-700 ease-in-out btn-primary btn-md cbtn ">
                  Read More...
                </button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className=" bg-gray-700 p-5 px-14 cbtn h-1/3 mx-auto">
              {" "}
              <p className="text-xl text-white">
                <i className="fa-solid fa-bullseye"></i>
                <span> Best Producer</span>
              </p>
              <p className="px-7">more then 160+ cparts</p>
            </div>
            <div className="mt-1 bg-gray-700 p-5 crbtn h-1/3 mx-auto">
              <p className="text-xl text-white">
                <i className="fa-solid fa-bullseye"></i>
                <span> Best Customer</span>
              </p>
              <p className="px-7">more then 200+ customer good review</p>
            </div>
            <div className="mt-1 bg-gray-700 p-5 cbtn h-1/3 mx-auto">
              <p className="text-xl text-white">
                <i className="fa-solid fa-bullseye"></i>
                <span> Global Business</span>
              </p>
              <p className="px-7">more then 35+ countries</p>
            </div>
          </div>
        </div>
      </div>
      {/* who we are  */}

      {/* our services */}

      <h3 className="text-5xl">Our Products</h3>
      <div className="bg-zinc-900 pb-4">
        <div className="container grid grid-cols-1 md:grid-cols-8 mx-auto  pt-4">
          <div className="hidden md:block col-span-1">
            <div>
              <figure>
                <img
                  src="https://swall.teahub.io/photos/small/363-3637448_magnum-desert-eagle-hd-wallpapers-military-wallbase.jpg"
                  alt="Shoes"
                />
              </figure>
            </div>
          </div>

          <div className="col-span-8 md:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serveice.slice(0, 6).map((item) => (
                <HomeCart item={item} key={item._id} />
              ))}
            </div>
            <div className="col-span-8 md:col-span-6 content-center mt-3">
              <Link to="/products">
                <button className="btn ">See more</button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block col-span-1">
            <figure>
              <img
                src="https://swall.teahub.io/photos/small/363-3637448_magnum-desert-eagle-hd-wallpapers-military-wallbase.jpg"
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
      </div>
      <h3 className="bg-gray-200 text-5xl text-gray-800 my-5"> Stats</h3>
      <div class="stats shadow flex justify-between text-gray-200 my-4">
        <div class="stat bg-gray-600">
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">Total Likes</div>
          <div class="stat-value text-primary">25.6K</div>
          <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat bg-gray-800">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div class="stat-title">Product Reviews</div>
          <div class="stat-value text-secondary">260+</div>
          <div class="stat-desc">21% more than last month</div>
        </div>

        <div class="stat bg-gray-600">
          <div class="stat-figure text-secondary">
            <div class="avatar online"></div>
          </div>
          <div class="stat-value">86%</div>
          <div class="stat-title">Coutomer Satisfaction</div>
          <div class="stat-desc text-secondary">More then 5000 customer</div>
        </div>
      </div>

      <h3 className="bg-gray-200 text-5xl text-gray-800 my-5">
        Customer Reviews
      </h3>
      <div className="bg-zinc-900 py-3">
        <div className="container grid grid-cols-1 md:grid-cols-8 mx-auto gap-4 pt-4">
          {reviews &&
            reviews.slice(0, 8).map((e) => (
              <div key={e._id + "rts"} className="col-span-2">
                <ReviewCard data={e} ishome={true} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
