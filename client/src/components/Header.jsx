import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [orders, setOrders] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/get/userId",
        { withCredentials: true }
      );

      const fileterdData = response.data.filter(
        (order) => order.orderStatus !== "delivered"
      );

      setOrders(fileterdData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(orders);
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, []);

  return (
    <nav
      className={`bg-gray-100 border-b-2 border-black p-3 font-semibold mb-10`}
    >
      <div className="md:flex justify-around items-center">
        <div className="text-[2.4rem] flex justify-around items-center relative">
          <span className="text-amber-500 ">Auth</span>
          <div onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <div>
          <ul
            className={`text-[1.4rem] md:flex ${
              isMenuOpen ? "block" : "hidden"
            } space-y-8 md:space-y-0 font-semibold items-center flex flex-col md:flex-row justify-center `}
          >
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-amber-500">
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="md:ml-5 xl:mx-5 hover:text-amber-500">
              <NavLink to="/menu" onClick={closeMenu}>
                Menu
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-amber-500">
                  <NavLink to="/orders" onClick={closeMenu}>
                    Orders{" "}
                    <span className="text-gray-500">({orders.length})</span>
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-amber-500">
                  <NavLink to="/restaurant" onClick={closeMenu}>
                    restauarnt
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-amber-500">
                  <NavLink to="/profile" onClick={closeMenu}>
                    {currentUser && currentUser.profilePicture && (
                      <img
                        src={
                          FormData.profilePicture || currentUser.profilePicture
                        }
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-amber-500">
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
