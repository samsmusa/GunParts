import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentCard.css";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ConfirmModal from "./ConfirmModal";
import Progress from "../../../components/Progress/Progress";

const PaymentCard = ({ data, openRef, setTransationId, refetch }) => {
  const { product, item, ...res } = data;
  const { total } = res;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const closeRef = useRef();

  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    if (total) {
      fetch(
        "https://fathomless-wave-64649.herokuapp.com/create-payment-intent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({ total: total }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.clientSecret) {
            setClientSecret(res.clientSecret);
          }
        });
    }
  }, [total]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    setTransationId("");
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message || "");
    }

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: product.name,
            email: res.email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setTransationId(paymentIntent.id);
      setCardError("");
      data.status = "processing";
      data.transactionId = paymentIntent.id;
      data.payment_date = date;
      await fetch("https://fathomless-wave-64649.herokuapp.com/order", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(async (result) => {
          if (result.status === "success") {
            setIsLoading(false);
            await setTimeout(2000);
            setIsLoading(false);
            closeRef.current.click();
            openRef.current.click();
            refetch();
          }
        });
    }
  };

  // if (isLoading) {
  //   return <Progress />;
  // }
  return (
    <div>
      <input type="checkbox" id="payment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-8/12 max-w-5xl">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <Progress />
            </div>
          )}
          <label
            ref={closeRef}
            htmlFor="payment-modal"
            id="close-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Please Provide and check payment information
          </h3>
          <div
            className={
              isLoading
                ? "opacity-10 grid pt-4 gap-3 grid-cols-1 md:grid-cols-3"
                : "grid pt-4 gap-3 grid-cols-1 md:grid-cols-3"
            }
          >
            <div className="col-span-1 content-center justify-center  text-left">
              <img
                className="justify-self-stretch"
                src={product?.img}
                alt="pro"
              />
              <p>{product?.name}</p>
              <p>{product?.partsType}</p>
              <p>{product?.gunType}</p>
              <p>{product?.time}</p>
            </div>
            <div className="col-span-1 self-center">
              <table className="table-auto w-full ">
                <thead>
                  <tr>
                    <th>color</th>
                    <th>size</th>
                    <th>delivery</th>
                    <th>cost</th>
                  </tr>
                </thead>
                <tbody>
                  {item &&
                    item.map((e) => (
                      <tr className="border-2 border-sky-500  border-x-0 ">
                        <td>{e.color}</td>
                        <td>{e.size}</td>
                        <td>{e.delivery}</td>
                        <td>{data?.product?.cost}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="divider"></div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>${res.total}</p>
              </div>
            </div>
            <div className="col-span-1">
              <form onSubmit={handleSubmit}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "rgb(212 212 216)",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "rgb(219 39 119)",
                      },
                    },
                  }}
                />

                <button
                  disabled={!stripe || !clientSecret}
                  className="btn btn-sm"
                  type="submit"
                >
                  Pay
                </button>
                <span className="block pt-2 text-xs text-error">
                  {cardError}
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
