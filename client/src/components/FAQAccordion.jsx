import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { accordionData } from "@/data/data.js";

const FAQAccordion = () => {
  return (
    <section className="mb-auto">
      <div className="w-full md:w-2/3 m-auto shadow-2xl rounded-md mb-[7rem]">
        <Accordion defaultIndex={[0]}>
          {accordionData.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionButton
                _focus={{ outline: "none" }}
                _hover={{ bg: "gray.100" }}
                _expanded={{ bg: "gray.100" }}
                py={3}
                px={4}
                textAlign="left" // Alinea el texto a la izquierda
                borderBottom="1px solid" // Añade un borde inferior
                borderColor="gray.200" // Define el color del borde
              >
                <Box flex="1">{item.question}</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                pb={4}
                fontSize="sm"
                maxH="200px"
                overflowY="auto"
                transition="max-height 0.2s ease-in-out"
                textAlign="left"
              >
                {item.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
