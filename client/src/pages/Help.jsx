import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FAQAccordion from "@/components/FAQAccordion";

const Help = () => {

  return (
    <section className="flex justify-center items-center md:h-[65vh] mt-[5rem]">
      <div className="text-center">
        <Xanimation>
          <h1 className="text-2xl font-bold text-color-dark underline mb-5">Preguntas frecuentes</h1>
        </Xanimation>
        <FadeAnimation>
          <FAQAccordion />
        </FadeAnimation>
      </div>
    </section>
  );
};

export default Help;
