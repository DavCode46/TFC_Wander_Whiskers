import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { accordionData } from "@/data/data.js";
import useTheme from '@context/ThemeContext';

const FAQAccordion = () => {
  const { themeMode } = useTheme();
  return (
    <section className="mb-auto">
      <div className={`${themeMode === 'dark' ? 'bg-dark-card text-[#ccc]' : ''} w-[90%] md:w-2/3 m-auto shadow-2xl rounded-md mb-[7rem]`}>
        <Accordion defaultIndex={[0]}>
          {accordionData.map((item, index) => (
            <AccordionItem key={index}>
              {() => (
                <>
                  <AccordionButton
                    _focus={{ outline: "none" }}
                    _hover={{ bg: themeMode === 'dark' ? 'gray.700' : 'gray.100' }} // Estilo para el hover
                    _expanded={{ bg: themeMode === 'dark' ? 'gray.600' : 'blue.50', color: themeMode === 'dark' ? 'white' : 'blue.800' }} // Estilo para el acordeón expandido
                    py={3}
                    px={4}
                    textAlign="left"
                    borderBottom="1px solid"
                    borderColor="gray.200"
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
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
