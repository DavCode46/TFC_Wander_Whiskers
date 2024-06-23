import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FAQAccordion from "@/components/FAQAccordion";
import useTheme from "@/context/ThemeContext";

const Help = () => {
  const {themeMode} = useTheme()

  return (
    <section className="flex justify-center items-center md:h-[80vh] mt-[5rem]">
      <div className="text-center">
        <Xanimation>
          <h1 className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-color-dark'} text-2xl font-bold underline mb-5`}>Preguntas frecuentes</h1>
        </Xanimation>
        <FadeAnimation>
          <FAQAccordion />
        </FadeAnimation>
      </div>
    </section>
  );
};

export default Help;
