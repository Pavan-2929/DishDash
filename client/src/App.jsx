import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import SingleRestaurant from "./components/Profile/SingleRestaurant";
import RestaurantForm from "./components/Profile/RestaurantForm";
import Menu from "./pages/Menu";
import RestaurantMenu from "./components/menu/RestaurantMenu";
import CartIcon from "./components/cart/CartIcon";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CartIcon/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/restaurant/manage/:id" element={<SingleRestaurant />} />
          <Route path="/restaurant/create" element={<RestaurantForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
