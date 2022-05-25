import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Progress from "../../../components/Progress/Progress";
import LoadData from "../../../hooks/LoadData";
import DeleteProductModal from "./DeleteProductModal";
import ProductActionModal from "./ProductActionModal";

const Products = () => {
  const [edititem, setEdititem] = useState({});
  const [deletedId, setDeletedId] = useState("");
  const [rateCount, setrateCount] = useState([]);
  const [soldCount, setSoldCount] = useState([]);

  function getOccurrencear(array, value) {
    var count = [];
    array.forEach((v) => {
      if (v.product._id === value) {
        count.push(v);
      }
    });
    return { _id: value, data: count };
  }
  function getRatings(array, id) {
    var count = 0;
    array.forEach((v) => {
      count += parseInt(v.rating);
    });
    return { average: count, rate: array.length, _id: id };
  }
  function getsold(array, id) {
    var count = 0;
    array.forEach((v) => {
      count += v.item.length;
    });
    return { sold: count, _id: id };
  }

  const {
    data: product,
    refetch,
    isLoading,
  } = LoadData("http://localhost:5000/products", ["adminProduct"]);
  const { data: orderes } = LoadData("http://localhost:5000/orders", [
    "adminorders",
  ]);
  // console.log(orderes)

  const { data: reviews } = LoadData("http://localhost:5000/reviews", [
    "adminreviews",
  ]);

  useEffect(() => {
    if (reviews && product) {
      const datasRating = product.map((e) => getOccurrencear(reviews, e._id));
      const datasOrder = product.map((e) => getOccurrencear(orderes, e._id));
      console.log(datasOrder);

      setSoldCount(datasOrder.map((e) => getsold(e.data, e._id)));

      setrateCount(datasRating.map((e) => getRatings(e.data, e._id)));
    }
  }, [reviews, product]);

  function RateCounter(id) {
    let rates = 0;
    let avrate = 0;
    rateCount.forEach((k) => {
      if (k._id === id) {
        rates = k.rate;
        if (parseFloat(k.average) / parseFloat(k.rate)) {
          avrate = parseFloat(k.average) / parseFloat(k.rate);
        }
      }
    });
    return [rates, avrate.toFixed(2)];
  }

  function SoldCounter(id) {
    let sold = 0;
    soldCount.forEach((k) => {
      if (k._id === id) {
        sold = k.sold;
      }
    });
    return [sold];
  }

  const actionItem = () => {};

  if (isLoading) {
    return <Progress />;
  }
  return (
    <div className=" w-full">
      <div className="flex justify-between">
        <div>
          <span className="pr-2 text-xl">Products</span>
          <span>
            <label
              onClick={() => setEdititem({})}
              htmlFor="product-modal"
              className="btn btn-sm btn-outline"
            >
              Add Product
            </label>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost h-8 w-40"
            disabled={true}
          />
          <button className="btn btn-sm ml-4 bg-base-100">Search</button>
        </div>
      </div>

      <div className="pt-2">
        <table className="table-fixed w-full h-60">
          <thead className="">
            <tr className="border-2 border-sky-500  border-x-0 ">
              <th className="">No</th>
              <th className="">name</th>
              <th className="">image</th>
              <th className="">gun-Type</th>
              <th className="">price</th>
              <th className="">review</th>
              <th className="">average rating</th>
              <th className="">sold</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((e, index) => (
                <tr key={e._id} className="border border-gray-500  border-x-0 ">
                  <th className="">{index + 1}</th>
                  <th className="">
                    <div
                      class="tooltip tooltip-info  tooltip-bottom hover:z-50"
                      data-tip={e?.name}
                    >
                      {e?.name.slice(0, 10)}
                    </div>
                  </th>
                  <th className="">
                    <img className="w-15 h-10" src={e?.img} alt="img" />{" "}
                  </th>
                  <th className="">{e?.gunType}</th>
                  <th className="">{e?.cost}</th>
                  <th className="">{RateCounter(e._id)[0]}</th>
                  <th className="">{RateCounter(e._id)[1]}</th>
                  <th className="">{SoldCounter(e._id)[0]}</th>
                  <th className="">
                    <label
                      onClick={() => setEdititem(e)}
                      htmlFor="product-modal"
                      className="btn mx-1 btn-sm btn-warning p-0 m-0"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </label>
                    <label
                      htmlFor="product-delete-modal"
                      onClick={() => setDeletedId(e._id)}
                      className="btn mx-1 btn-sm btn-error  p-0 m-0"
                    >
                      <i className="p-0 m-0 fa-solid fa-trash"></i>
                    </label>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ProductActionModal
        product={edititem}
        setEdititem={setEdititem}
        refetch={refetch}
      ></ProductActionModal>
      <DeleteProductModal id={deletedId} refetch={refetch} />
    </div>
  );
};

export default Products;
