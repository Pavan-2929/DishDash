import React from "react";
import { useSelector } from "react-redux";

const CartAddress = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <div>
      <div>
        {currentUser && currentUser.address ? (
          <div>
            <div>
              <p>Verify your address please</p>
            </div>
            <div>
                <div className="mb-4">
                  <label htmlFor="street">Street Line</label>
                  <input
                    type="text"
                    id="street"
                    value={currentUser.address.street}
                    disabled
                    className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={currentUser.address.city}
                    disabled
                    className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
                  />
                </div>
              <div className="mb-4">
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  type="text"
                  id="zipcode"
                  value={currentUser.address.zipcode}
                  disabled
                  className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zipcode">State</label>
                <input
                  type="text"
                  id="zipcode"
                  value={currentUser.address.state}
                  disabled
                  className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>please add address at profile page</div>
        )}
      </div>
    </div>
  );
};

export default CartAddress;
