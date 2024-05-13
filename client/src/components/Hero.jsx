import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import dog from "@images/dog.jpg";
import cat from "@images/cat.jpg";
import { Link } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/react";
import Yanimation from "@components/Animations/Yanimation/Yanimation";

import FadeAnimation from "@components/Animations/FadeAnimation/FadeAnimation";
import ScrollYanimation from "./Animations/Yanimation/ScrollYAnimation";
import ScrollFadeAnimation from "./Animations/FadeAnimation/ScrollFadeAnimation";
import ScrollXAnimation from "./Animations/Xanimation/ScrollXAnimation";
import PostDrawer from "./PostDrawer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const Hero = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`
        );
        setIsSubscribed(res.data.isSubscribed);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    setLoading(false);
  }, []);
  if (loading)
    return (
      <CircularProgress
        isIndeterminate
        size="100px"
        thickness="7px"
        aria-label="cargando"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  return (
    <section
      id="pet-adoption"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* <h1 className="font-grotesk text-4xl md:text-6xl font-bold text-center mb-8">

        </h1> */}
        <Yanimation
          heading
          className={
            "font-grotesk text-4xl md:text-6xl font-bold text-center mb-8"
          }
        >
          <ScrollYanimation>
            Encuentra tu compañero
            <span className="font-grotesk text-color-btn mt-2  py-2 px-6 border-8 border-color-btn relative inline-block">
              Peludo
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -top-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -top-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -bottom-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -bottom-5 p-2 bg-color-btn  rounded-full box-content" />
            </span>
          </ScrollYanimation>
        </Yanimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg">
            <ScrollFadeAnimation delay={0.2}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={dog}
                  alt="Perro"
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 font-montserrat">
                  Adopta un perro
                </h2>
                <p className="text-gray-700 text-center mb-4 font-sora">
                  Explora nuestra lista de perros esperando un hogar amoroso.
                </p>
                <Link
                  to="/posts/species/Perro"
                  className="bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white"
                >
                  Ver perros disponibles
                </Link>
              </div>
            </ScrollFadeAnimation>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg">
            <ScrollFadeAnimation delay={0.4}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={cat}
                  alt="Gato"
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 font-montserrat">
                  Adopta un gato
                </h2>
                <p className="text-gray-700 text-center mb-4 font-sora">
                  Descubre nuestros gatos buscando un hogar cariñoso y acogedor.
                </p>
                <Link
                  to="/posts/species/Gato"
                  className=" bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white"
                >
                  Ver gatos disponibles
                </Link>
              </div>
            </ScrollFadeAnimation>
          </div>
        </div>
        <div className="mt-8 font-grotesk flex justify-center items-center">
          <ScrollXAnimation>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-gray-700">¿Has perdido a tu mascota?</p>
              {isSubscribed ? (
                <PostDrawer homeButton />
              ) : (
                <h2 className="text-color-btn text-md">Subscríbete para publicar anuncios</h2>
              )}
              <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
              <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
              <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
            </div>
          </ScrollXAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
