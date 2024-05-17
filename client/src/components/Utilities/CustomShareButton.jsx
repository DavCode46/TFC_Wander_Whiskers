import useTheme from "@/context/theme";
import { Button } from "@chakra-ui/react";

import { FaRegPaperPlane } from "react-icons/fa";

const ShareButton = ({
  title,
  url,
  size
}) => {
  const {themeMode} = useTheme()
  const shareContent = async () => {
    try {
      await navigator.share({
        title: title,
        text: 'Tu futuro compañero te espera, mira el anuncio de este pequeño',
        url: url,
      });
      console.log("Contenido compartido con éxito");
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  const handleClick = () => {
    if (navigator.share) {
      shareContent();
    } else {
      alert("Compartir no es compatible en este navegador.");
      // Aquí puedes proporcionar una alternativa personalizada
    }
  };

  return (
    <Button
      onClick={handleClick}
      flex="1"
      variant={'default'}
      size='lg'      
    >
      <FaRegPaperPlane className={`${themeMode === 'dark' ? 'text-gray-300 hover:text-gray-400' : 'hover:text-gray-500'} transition-all duration-300`}/>
    </Button>
  );
};

export default ShareButton;