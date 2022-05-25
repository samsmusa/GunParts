import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadData from "../../hooks/LoadData";
import ReviewCard from "../Details/ReviewCard";
import HomeCart from "../Shared/HomeCart";
import Carusel from "./Carusel/Carusel";
const Home = () => {
  const [serveice, setService] = useState([]);
  const { data: reviews } = LoadData(
    "http://localhost:5000/reviews",
    "homeReview"
  );
  useEffect(() => {
    fetch("http://localhost:5000/products")
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
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive">
              If a dog chews shoes whose shoes does he choose?
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
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive">
              If a dog chews shoes whose shoes does he choose?
            </p>
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
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="font-cursive">
              If a dog chews shoes whose shoes does he choose?
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
              <span className="block py-3 border-2 pl-4 border-y-0 border-sky-500 text-white">
                but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages,
              </span>
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </p>
            <div className="flex flex-row content-start">
              <button className="transition duration-700 ease-in-out btn-primary btn-md cbtn ">
                Read More...
              </button>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className=" bg-gray-700 p-5 px-14 cbtn h-1/3 mx-auto">
              {" "}
              <p className="text-xl text-white">
                <i className="fa-solid fa-bullseye"></i>
                <span> Best Customer</span>
              </p>
              <p className="px-7">more then 200+ customer good review</p>
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
                <span> Best Customer</span>
              </p>
              <p className="px-7">more then 200+ customer good review</p>
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
      <h3 className="text-5xl">Customer Reviews</h3>
      <div className="bg-zinc-900">
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
