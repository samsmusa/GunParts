import React from "react";
import { useState } from "react";

const Blog = () => {
  const [value, setValue] = useState(0);

  function GenerateAnswer(int) {
    let element;
    switch (int) {
      case 1:
        element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-roboto text-4xl">
                How will you improve the performance of a React Application?
              </h2>
              <p className="font-code text-3xl text-left pt-5">
                five important ways to optimize the performance of a React
                application, including pre-optimization techniques. These
                include:
              </p>
              <ul className="list-disc font-code text-lg list-inside text-left pl-10">
                <li>Keeping component state local where necessary</li>{" "}
                <li>
                  Memoizing React components to prevent unnecessary re-renders
                </li>
                <li>Code-splitting in React using dynamic import()</li>{" "}
                <li>Windowing or list virtualization in React</li>{" "}
                <li>Lazy loading images in React</li>
              </ul>
            </div>
          </div>
        );
        break;
      case 2:
        element = element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-roboto text-4xl">
                What are the different ways to manage a state in a React
                application?
              </h2>
              <p className="font-code text-3xl text-left pt-5">
                There are four main types of state need to properly manage in
                React apps:
              </p>
              <ul className="list-disc font-code text-lg list-inside text-left pl-10">
                <li>Use useReducer for Complex State</li>{" "}
                <li>Custom Hooks FTW</li>
                <li>Global State Management</li>{" "}
                <li>Windowing or list virtualization in React</li>{" "}
                <li>Use Data Fetching Libraries</li>
              </ul>
            </div>
          </div>
        );
        break;
      case 3:
        element = element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-roboto text-4xl">
                How does prototypical inheritance work?
              </h2>
              <p className="font-code text-3xl text-left pt-5">
                The Prototypal Inheritance is a feature in javascript used to
                add methods and properties in objects. It is a method by which
                an object can inherit the properties and methods of another
                object. Traditionally, in order to get and set the [[Prototype]]
                of an object, we use Object.getPrototypeOf and
                Object.setPrototypeOf. Nowadays, in modern language, it is being
                set using __proto__.
              </p>
            </div>
            <figure>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20200520193336/Untitled-Diagram108.png"
                alt="Shoes"
              />
            </figure>
          </div>
        );
        break;
      case 4:
        element = element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-roboto text-4xl">
                What is a unit test? Why should write unit tests?
              </h2>
              <p className="font-code text-3xl text-left pt-5">
                Unit tests are typically automated tests written and run by
                software developers to ensure that a section of an application
                (known as the "unit") meets its design and behaves as
                intended.[2] In procedural programming, a unit could be an
                entire module, but it is more commonly an individual function or
                procedure.
              </p>
              <ul className="list-disc font-code text-lg list-inside text-left pl-10">
                <li>
                  Unit tests help to fix bugs early in the development cycle and
                  save costs
                </li>{" "}
                <li>
                  It helps the developers to understand the testing code base
                  and enables them to make changes quickly
                </li>
                <li>
                  It helps the developers to understand the testing code base
                  and enables them to make changes quickly
                </li>{" "}
                <li>
                  Unit tests help with code re-use. Migrate both your code and
                  your tests to your new project. Tweak the code until the tests
                  run again.
                </li>{" "}
              </ul>
            </div>
          </div>
        );
        break;
      case 5:
        element = element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-roboto text-4xl">
                You have an array of products. Each product has a name, price,
                description, etc. How will you implement a search to find
                products by name?
              </h2>
              <p className="font-code font-bold text-3xl text-left pt-5">
                {"const[search, setSearch] = useState('')"} <br />
                {"const[product, setProduct] = useState([...])"}
                <br />
                {"useEffetc(()=>{"}
                <br />
                {"setProduct(product.filter(e=>e.name===name))"}
                <br />
                {"},[name])"}
                <br />
              </p>
            </div>
            <figure>
              <img
                src="https://www.w3resource.com/w3r_images/javascript-fundamental-image-exercise-8.svg"
                alt="Shoes"
              />
            </figure>
          </div>
        );
        break;
      default:
        element = (
          <div className="card content-center card-compact w-8/12 bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="font-extrabold text-center font-cursive text-5xl">
                What's your Question ?
              </h2>
              <p className="font-code font-bold text-3xl pt-12  pt-5">
                <span className="text-info">{"function (){"}</span>
                <br />
                <span className="text-error">{"print("}</span>
                <span className="">"{"hello World"}"</span>
                <span className="text-error">{")"}</span>
                <br />
                <span className="text-info">{"}"}</span>
                <br />
              </p>
            </div>
          </div>
        );
    }
    return element;
  }
  return (
    <div className="min-h-screen">
      <ul className="menu menu-vertical lg:menu-horizontal bg-gray-600 rounded-box ">
        <li>
          <p onClick={() => setValue(1)}>Question-1</p>
        </li>
        <li>
          <p onClick={() => setValue(2)}>Question-2</p>
        </li>
        <li>
          <p onClick={() => setValue(3)}>Question-3</p>
        </li>
        <li>
          <p onClick={() => setValue(4)}>Question-4</p>
        </li>
        <li>
          <p onClick={() => setValue(5)}>Question-5</p>
        </li>
      </ul>
      <div className="min-h-screen grid grid-cols-1 place-content-center">
        <div className="mt-4 container mx-auto flex place-content-center  ">
          {GenerateAnswer(value)}
        </div>
      </div>
    </div>
  );
};

export default Blog;
