import { useState, useRef } from "react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import {
  Select,
  Input,
  InputGroup,
  Stack,
  Button,
  FormControl,
  Box,
  Textarea,
  InputLeftAddon,
} from "@chakra-ui/react";

import { FaRegUser } from "react-icons/fa";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import Yanimation from "@/components/Animations/Yanimation/Yanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateEmailParams = {
      from_name: name,
      from_email: email,
      contact_number: phone,
      to_name: "Wander Whiskers",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateEmailParams, publicKey)
      .then(() => {
        console.log("Email successfully sent!");
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
        }, 6000);
      })
      .catch((err) => {
        console.log("Error sending email:", err);
      });
  };

  return (
    <section className="relative flex justify-center items-center h-screen">
      {/* <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-color-primary to-color-secondary clip-triangle" /> */}
      <Box className="w-full md:w-3/5 lg:w-2/4 xl:w-1/3 z-10">
        <FadeAnimation>
          <section className="bg-color-form rounded-2xl shadow-lg px-8 py-10">
            <div className="text-center mb-8">
              {!isSent ? (
                <>
                  <Xanimation>
                    <h2 className="text-3xl font-bold text-color-dark">
                      ¡Contáctanos!
                    </h2>
                    <p className="text-color-dark">
                      Estamos aquí para ayudarte.
                    </p>
                  </Xanimation>
                </>
              ) : (
                <>
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                  />
                  <h3 className="text-green-500 text-xl font-bold mb-4">
                    ¡Mensaje enviado con éxito!
                  </h3>
                  <p>¡Gracias por contactarnos!</p>
                </>
              )}
            </div>
            {!isSent && (
              <Yanimation>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <InputGroup size="sm">
                      <InputLeftAddon>
                        <FaRegUser className="text-color-dark" />
                      </InputLeftAddon>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Nombre completo"
                        size="sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
                      />
                      {/* <Select
                     size="sm"
                     name=""
                     className="rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
                   >
                     <option value="consulta">Motivo de consulta</option>
                     {contactOptions.map((option, index) => (
                       <option key={index} value={option.value}>
                         {option.label}
                       </option>
                     ))}
                   </Select> */}
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>
                        <PhoneIcon className="text-color-dark" />
                      </InputLeftAddon>
                      <Input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Teléfono de contacto"
                        size="sm"
                        className="rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon>
                        <EmailIcon className="text-color-dark" />
                      </InputLeftAddon>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email de contacto"
                        size="sm"
                        className="rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
                      />
                    </InputGroup>
                    <FormControl id="description">
                      <Textarea
                        name="description"
                        placeholder="Mensaje de consulta"
                        resize="none"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-color-primary"
                      />
                    </FormControl>
                    <button
                      type="submit"
                      color="white"
                      className="rounded-md py-2 px-4 bg-color-btn hover:bg-color-btnHover transition duration-300 text-white"
                    >
                      ¡Enviar mensaje!
                    </button>
                  </Stack>
                </form>
              </Yanimation>
            )}
          </section>
        </FadeAnimation>
      </Box>
    </section>
  );
};

export default Contact;
