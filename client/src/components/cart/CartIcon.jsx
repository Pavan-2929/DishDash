// CartIcon.js
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import CartAddress from "./CartAddress";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from 'axios'

const CartIcon = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState("cart");
    const cart = useSelector((state) => state.cart.cart);
console.log(cart);

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
      return "50%";
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
 
    const response = await axios.post("http://localhost:3000/api/create-checkout-session", cart)

    const session = response.data

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })

    if(result.error){
      console.log(result.error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full border-2 border-gray-300 shadow-md hover:cursor-pointer">
        <FaShoppingCart
          className="text-gray-700 text-2xl"
          onClick={toggleModal}
        />
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
                  onClick={makePayment}
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
