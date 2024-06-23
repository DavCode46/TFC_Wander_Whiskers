import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import dog from "@images/dog.webp";
import cat from "@images/cat.webp";
import { Link } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/react";
import Yanimation from "@components/Animations/Yanimation/Yanimation";


import ScrollYanimation from "./Animations/Yanimation/ScrollYAnimation";
import ScrollFadeAnimation from "./Animations/FadeAnimation/ScrollFadeAnimation";
import ScrollXAnimation from "./Animations/Xanimation/ScrollXAnimation";
import PostDrawer from "./PostDrawer";
import { useContext,  useState } from "react";

import { UserContext } from "@/context/UserContext";
import useTheme  from '@context/ThemeContext'
const Hero = () => {
  
  const [loading, setLoading] = useState(false);
  const { themeMode } = useTheme();

  const { isSubscribed } = useContext(UserContext);
  
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
      
        <Yanimation
          heading
          className={
            "font-grotesk text-4xl md:text-6xl font-bold text-center mb-8"
          }
        >
          <ScrollYanimation>
            <h1 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''}`}>Encuentra tu compañero</h1>
            <span className={`${themeMode === 'dark' ? 'text-dark-primary border-dark-primary' : 'border-color-btn'} font-grotesk text-color-btn mt-2 py-2 px-6 border-8  relative inline-block`}>
              Peludo
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -left-5 -top-5 p-2   rounded-full box-content`}/>
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -right-5 -top-5 p-2   rounded-full box-content`} />
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -right-5 -bottom-5 p-2   rounded-full box-content`} />
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -left-5 -bottom-5 p-2   rounded-full box-content`} />
            </span>
          </ScrollYanimation>
        </Yanimation>
        <div className="grid grid-cols-1 md:grid-cols-2 md:ml-6 gap-8">
          <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-gray-100 '} flex flex-col justify-center items-center p-8 rounded-lg`}>
            <ScrollFadeAnimation delay={0.2}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={dog}
                  alt="Perro"
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h2 className={`${themeMode === 'dark' ? 'text-dark-lightGrey' : ''} text-2xl font-semibold mb-2 font-montserrat`}>
                  Adopta un perro
                </h2>
                <p className={`${themeMode === 'dark' ? 'text-dark-silver' : 'text-gray-700 '} text-center mb-4 font-sora`}>
                  Explora nuestra lista de perros esperando un hogar amoroso.
                </p>
                <Link
                  to="/posts/species/Perro"
                  className={`${themeMode === 'dark' ? 'bg-a-6 hover:bg-a-7 active:bg-a-7' : 'bg-color-btn hover:bg-color-btnHover '} text-white py-2 px-4 rounded-md transition duration-300 hover:text-white`}
                >
                  Ver perros disponibles
                </Link>
              </div>
            </ScrollFadeAnimation>
          </div>
          <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-gray-100 '} flex flex-col justify-center items-center p-8 rounded-lg`}>
            <ScrollFadeAnimation delay={0.4}>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={cat}
                  alt="Gato"
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h2 className={`${themeMode === 'dark' ? 'text-dark-lightGrey' : ''} text-2xl font-semibold mb-2 font-montserrat`}>
                  Adopta un gato
                </h2>
                <p className={`${themeMode === 'dark' ? 'text-dark-silver' : 'text-gray-700 '} text-center mb-4 font-sora`}>
                  Descubre nuestros gatos buscando un hogar cariñoso y acogedor.
                </p>
                <Link
                  to="/posts/species/Gato"
                  className={`${themeMode === 'dark' ? 'bg-a-6 hover:bg-a-7 active:bg-a-7' : 'bg-color-btn hover:bg-color-btnHover '} text-white py-2 px-4 rounded-md transition duration-300 hover:text-white`}
                >
                  Ver gatos disponibles
                </Link>
              </div>
            </ScrollFadeAnimation>
          </div>
        </div>
        <div className="mt-8 font-grotesk flex justify-center items-center">
          <ScrollXAnimation>
            <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
              <p className={`${themeMode === 'dark' ? 'text-dark-lightGrey' : 'text-gray-700'}`}>¿Has perdido a tu mascota?</p>
              {isSubscribed ? (
                <PostDrawer homeButton />
              ) : (
                <h2 className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-md`}>Subscríbete para publicar anuncios</h2>
              )} 
              <div className="flex">
                <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-2xl`} />
                <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-2xl`} />
                <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-2xl`} />
              </div>
            </div>
          </ScrollXAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;
