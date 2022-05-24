import React from "react";

const Carusel = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4E1BAQESuYrhCi6ObA/company-background_10000/0/1635436189454?e=2147483647&v=beta&t=wwGRAwjbqmSlgiQ-sWMWeQ3VJAatjenjJQcqnz2-gcU"
          className="w-full"
        />{" "}
        /
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://gray-wbrc-prod.cdn.arcpublishing.com/resizer/NA5Dp6px2euUEsdttLiohYs0EO8=/800x200/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/TPBIT2FXXND5ZILS2OHMWAO5DA.jpg"
          className="w-full"
        />{" "}
        /
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://uploads.patrolbase.co.uk/blogs/krytac%20p90%20blog/krytac%20p90%20header.png"
          className="w-full"
        />{" "}
        /
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4E16AQFLUjKyHbXc7w/profile-displaybackgroundimage-shrink_200_800/0/1623851195415?e=1657152000&v=beta&t=aqySVZ4xBP-cFnPq2lpzLKL-AK2ZcNrbE9suYja4Kjk"
          className="w-full"
        />{" "}
        /
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carusel;
