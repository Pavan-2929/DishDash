import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";
import Hero from "../components/Hero";
import HomeMenu from "../components/HomeMenu";
import SectionHeaders from "../components/SectionHeaders";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const user = await axios.get(
        "https://dishdash-server.onrender.com/api/user",
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(user.data));
      setUserData(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, []);

  return (
    <div>
      <Hero />
      <HomeMenu />
      <section>
        <div className="text-center mt-16 mb-8">
          <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        </div>
        <div className="max-w-6xl text-gray text-center mx-auto flex flex-col gap-4 text-lg">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            soluta iste quia consectetur, earum explicabo natus molestiae autem
            voluptatibus velit ratione voluptates at delectus magni distinctio
            iusto? Recusandae, repudiandae animi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            non, cupiditate soluta cumque asperiores tempore sed aut atque quo
            neque animi nesciunt, laborum fuga facere eos assumenda minima
            possimus molestiae!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            sed eos accusamus autem excepturi, nihil aliquam dolorem laboriosam
            unde, a iusto ab dignissimos! Obcaecati necessitatibus excepturi
            voluptate non unde libero enim repudiandae dolores rerum ipsa!
          </p>
        </div>
      </section>
      <section>
        <div className="text-center mt-16 mb-8">
          <SectionHeaders
            subHeader={"Do not hesitate to"}
            mainHeader={"Contact us"}
          />
        </div>
        <div className="max-w-6xl text-gray text-center mx-auto flex flex-col gap-2 text-2xl">
          <p>
            <a href="mailto:mealmaster@gmail.com" className="hover:text-snow">
              Email: mealmaster@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+913244447730" className="hover:text-snow">
              Phone no: +91 32444 47730
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
