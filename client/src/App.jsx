import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import SingleRestaurant from "./components/SingleRestaurant";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
