import { Button } from "@chakra-ui/react";

import { BiChat } from "react-icons/bi";

const SendMessageButton = ({size}) => {
  const handleSendMessage = () => {
    // Dirección de correo electrónico del destinatario
    const recipientEmail = "destinatario@example.com";

    // Asunto del mensaje
    const subject = "Asunto del mensaje";

    // Cuerpo del mensaje
    const body = "Contenido del mensaje";

    // Generar el URI para el enlace de correo electrónico
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Abrir el cliente de correo electrónico predeterminado con los datos proporcionados
    window.open(mailtoLink);
  };

  return (
    <Button flex="1" size={size} variant="ghost" leftIcon={<BiChat />} onClick={handleSendMessage}  _hover={{ bg: "rgba(177, 201, 239, .3)" , transition: "background-color .5s" }}>
      Contactar
    </Button>
  );
};

export default SendMessageButton;
