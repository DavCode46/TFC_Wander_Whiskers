import FAQAccordion from "@/components/FAQAccordion";

const Help = () => {
  return (
    <section className="flex justify-center items-center md:h-[65vh] mt-[5rem]">
      <div className="text-center">
        <h1 className="text-2xl underline mb-5">Preguntas frecuentes</h1>
        <FAQAccordion />
      </div>
    </section>
  );
};

export default Help;
