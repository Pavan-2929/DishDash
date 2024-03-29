import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import CartAddress from "./CartAddress";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState("cart");
  const cart = useSelector((state) => state.cart.cart);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const navigate = useNavigate();

  const handleProceed = () => {
    if (currentStep === "cart") {
      setCurrentStep("address");
    }
  };

  const handleBack = () => {
    setCurrentStep("cart");
  };

  const getProgressBar = () => {
    if (currentStep === "cart") {
      return "20%";
    } else if (currentStep === "address") {
      return "70%";
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const checkPayementMethod = async () => {
    if (paymentMethod === "cash") {
      toggleModal();
      const response1 = await axios.post(
        "http://localhost:3000/api/order/create",
        { cart, paymentMethod },
        { withCredentials: true }
      );
      navigate("/payment-success");
    } else {
      makePayment();
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

    const response1 = await axios.post(
      "http://localhost:3000/api/order/create",
      { cart, paymentMethod },
      { withCredentials: true }
    );

    console.log(response1);

    const response = await axios.post(
      "http://localhost:3000/api/create-checkout-session",
      cart
    );

    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  console.log(paymentMethod);
  return (
    <div className="relative">
      <div className="fixed top-24 md:top-4 right-4 z-50">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full border-2 border-gray-300 shadow-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
          <FaShoppingCart
            className="text-gray-700 text-2xl group-hover:text-gray-900 transition-colors duration-300"
            onClick={toggleModal}
          />
        </div>
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cart.length}
        </span>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-[95vw] md:w-[40vw] max-h-[80vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="h-4 bg-yellow-500 rounded-full relative flex-1 mr-4">
                <div
                  className="h-full bg-yellow-600 rounded-full"
                  style={{
                    width: getProgressBar(),
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              {currentStep === "address" && (
                <div>
                  <button
                    onClick={handleBack}
                    className="text-gray-100 bg-gray-500 px-3 py-1 rounded-full transition duration-300 hover:bg-gray-600"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
            {currentStep === "cart" && <Cart />}
            {currentStep === "address" && <CartAddress />}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <div>
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="mr-2"
                />
                <label htmlFor="cash" className="mr-4">
                  Cash on Delivery
                </label>
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="mr-2"
                />
                <label htmlFor="online">Online Payment</label>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              {currentStep === "cart" ? (
                <button
                  onClick={handleProceed}
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
                >
                  Proceed to Address
                </button>
              ) : (
                <button
                  onClick={checkPayementMethod}
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
                >
                  Proceed to Payment
                </button>
              )}

              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-lg transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
