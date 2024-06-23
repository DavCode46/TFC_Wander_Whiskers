import { Button } from "@chakra-ui/react";

import { MessageOutlined } from "@ant-design/icons";
import useTheme from "@context/ThemeContext";

const SendMessageButton = () => {
  const {themeMode} = useTheme()
  const handleSendMessage = () => {
   
    const recipientEmail = "destinatario@example.com";

   
    const subject = "Asunto del mensaje";

    
    const body = "Contenido del mensaje";

   
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Abrir el cliente de correo electrónico predeterminado con los datos proporcionados
    window.open(mailtoLink);
  };

  return (
    <Button
      flex="1"
      variant={"default"}
      size="lg"
      className="hover:text-gray-500"
      onClick={handleSendMessage}
    >
      <MessageOutlined className={`${themeMode === 'dark' ? 'text-gray-300 hover:text-gray-400' : 'hover:text-gray-500'} transition-all duration-300`}/>
    </Button>
  );
};

export default SendMessageButton;
