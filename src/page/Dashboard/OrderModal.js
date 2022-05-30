import React from "react";

const OrderModal = ({ data }) => {
  const { product, item } = data;
  return (
    <div>
      <input type="checkbox" id="lot-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-slate-800">
          <h3 className="font-bold text-lg">{product?.name}</h3>
          <table className="table-fixed w-full h-60">
            <thead className="">
              <tr className="border-2 border-sky-500  border-x-0 ">
                <th className="">No</th>
                <th className="">color</th>
                <th className="">size</th>
                <th className="">delivery</th>
              </tr>
            </thead>
            <tbody>
              {item &&
                data?.item.map((e, index) => (
                  <tr className="border border-gray-500  border-x-0 ">
                    <th className="">{index + 1}</th>
                    <th className="">{e?.color}</th>
                    <th className="">{e?.size}</th>
                    <th className="">{e?.delivery}</th>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="modal-action">
            <label htmlFor="lot-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
