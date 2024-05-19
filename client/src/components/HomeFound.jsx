import cat2 from "@images/cat2.jpg";
import cat3 from "@images/cat3.jpg";
import husky from "@images/husky.jpg";
import bulldog from "@images/bulldog.jpg";
import haru3 from "@images/haru3.jpg";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import ScrollFadeAnimation from "./Animations/FadeAnimation/ScrollFadeAnimation";
import ScrollXAnimation from "./Animations/Xanimation/ScrollXAnimation";
import ScrollYAnimation from "./Animations/Yanimation/ScrollYAnimation";
import useTheme from "@/context/ThemeContext";

const HomeFound = () => {
  const {themeMode} = useTheme()

  return (
    <div id="aboutUs" className="p-8 xl:p-20 ml-10">
      <div className="mb-8 font-grotesk">
        <ScrollYAnimation>
          <h2 className={`${themeMode === 'dark' ? 'text-dark-heading' : 'font-black'} text-[40px]`}>
            Encuentra a tu compañero peludo con{" "}
            <span className={`${themeMode === 'dark' ? 'text-dark-primary border-dark-primary' : 'border-color-btn'} font-grotesk text-color-btn mt-2 py-2 px-6 border-8  relative inline-block`}>
              {" "}
              Wander Whiskers
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -left-5 -top-5 p-2   rounded-full box-content`} />
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -right-5 -top-5 p-2   rounded-full box-content`}  />
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -left-5 -bottom-5 p-2   rounded-full box-content`}  />
              <RiCheckboxBlankCircleFill className={`${themeMode === 'dark' ? 'bg-dark-primary text-dark-text' : 'text-white bg-color-btn'} text-base absolute -right-5 -bottom-5 p-2   rounded-full box-content`} />
            </span>
          </h2>
        </ScrollYAnimation>
        <ScrollXAnimation>
          <p className={`${themeMode === 'dark' ? 'text-dark-lightGrey' : 'text-gray-500 '} text-xl mt-5`}>
            Con Wander Whiskers , puedes buscar y adoptar animales perdidos o
            abandonados cerca de ti.
          </p>
        </ScrollXAnimation>
      </div>
      {/* Works */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 font-montserrat">
        <ScrollFadeAnimation delay={0.2}>
          <div className="flex flex-col gap-2">
            <img
              src={haru3}
              alt="Shiba Inu"
              className="w-full h-[600px] object-cover rounded-3xl"
            />
            <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
              Mascota adoptada - 20 de mayo de 2023
            </p>
            <h3 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''} text-2xl font-bold`}>
              Ayuda a los animales perdidos
            </h3>
            <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
              Esta aplicación ayudó a rescatar a este Shiba Inu perdido y lo
              conectó con un nuevo hogar amoroso.
            </p>
          </div>
        </ScrollFadeAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollFadeAnimation delay={0.4}>
            <div className="flex flex-col gap-4">
              <img
                src={bulldog}
                alt="Bulldog"
                className="w-full h-56 object-cover rounded-3xl"
              />
              <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
                Mascota adoptada - 15 de abril de 2023
              </p>
              <h3 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''} text-2xl font-bold`}>Encuentra a tu mejor amigo</h3>
            </div>
          </ScrollFadeAnimation>
          <ScrollFadeAnimation delay={0.6}>
            <div className="flex flex-col gap-4">
              <img
                src={husky}
                alt="Husky"
                className="w-full h-56 object-cover rounded-3xl"
              />
              <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
                Mascota recuperada - 10 de marzo de 2023
              </p>
              <h3 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''} text-2xl font-bold`}>Un hogar para todos</h3>
            </div>
          </ScrollFadeAnimation>
          <ScrollFadeAnimation delay={0.8}>
            <div className="flex flex-col gap-4">
              <img
                src={cat2}
                alt="Gato"
                className="w-full h-56 object-cover rounded-3xl"
              />
              <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
                Mascota recuperada - 5 de febrero de 2023
              </p>
              <h3 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''} text-2xl font-bold`}>Un nuevo comienzo</h3>
            </div>
          </ScrollFadeAnimation>
          <ScrollFadeAnimation delay={1}>
            <div className="flex flex-col gap-4">
              <img
                src={cat3}
                alt="Gato"
                className="w-full h-56 object-cover rounded-3xl"
              />
              <p className={`${themeMode === 'dark' ? 'text-dark-white' : 'text-gray-500'}`}>
                Mascota adoptada - 1 de enero de 2023
              </p>
              <h3 className={`${themeMode === 'dark' ? 'text-dark-heading' : ''} text-2xl font-bold`}>Un amor incondicional</h3>
            </div>
          </ScrollFadeAnimation>
        </div>
      </div>
    </div>
  );
};

export default HomeFound;
