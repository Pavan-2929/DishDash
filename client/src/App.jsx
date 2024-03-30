import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import SingleRestaurant from "./components/restaurant/SingleRestaurant";
import RestaurantForm from "./components/restaurant/RestaurantForm";
import Menu from "./pages/Menu";
import RestaurantMenu from "./components/menu/RestaurantMenu";
import CartIcon from "./components/cart/CartIcon";
import Success from "./components/cart/Success";
import Failure from "./components/cart/Failure";
import Order from "./pages/Order";
import Restaurant from "./components/restaurant/Restaurant";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CartIcon />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failure" element={<Failure />} />
            <Route path="/orders" element={<Order />} />
            <Route
              path="/restaurant/manage/:id"
              element={<SingleRestaurant />}
            />
            <Route path="/restaurant/create" element={<RestaurantForm />} />
          </Route>
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
