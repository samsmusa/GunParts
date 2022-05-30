import React from 'react';

const Portfolio = () => {
    return (
      <div className="bg-slate-800">
        <div className=" bg-slate-800 h-60">
          <div className=""></div>
          <div className="hero-content text-center font-code text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl">Hello there!</h1>
              <h1 className="mb-5 text-4xl font-bold">
                I am Muhammad Samsuddin.
              </h1>
              <p className="  mb-3 w-72 mx-auto">
                {" "}
                <small>samsmusa@outlook.com</small>
              </p>
              <p className="mb-5">
                Web Developer. Some technologies that I use.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row ">
          <div className="grid flex-grow h-60 card rounded-box place-items-start p-5">
            <h1 className="text-2xl font-bold h-0 my-2">
              Educational Background
            </h1>
            <p className="m-0">
              <b>SSC:</b> AL jameatul falahia kamil madrasha (2013)
            </p>
            <p className="m-0">
              <b>HSC:</b> Govt. Science college (2015)
            </p>
            <p className="m-0">
              <b>BSc:</b> in Applied Mathematics, NSTU (2022)
            </p>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-60 card  rounded-box place-items-start p-5">
            <h1 className="text-2xl font-bold h-0 my-2">Some of my Projects</h1>
            <p className="m-0">
              2.{" "}
              <a
                className="link link-hover"
                href="https://superlative-kitsune-a1714d.netlify.app/"
                target={"_blank"}
              >
                book Website
              </a>
            </p>
            <p className="m-0">
              1.{" "}
              <a
                className="link link-hover"
                href="https://scholaruni.com"
                target={"_blank"}
              >
                Scholarship Website
              </a>
            </p>

            <p className="m-0">
              3.{" "}
              <a
                className="link link-hover"
                href="https://natural-food-inventory.web.app/"
                target={"_blank"}
              >
                Warehouse Manager
              </a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Portfolio;