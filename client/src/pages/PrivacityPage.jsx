import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import useTheme from "@context/ThemeContext";
import React from "react";

const PrivacyPage = () => {
  const {themeMode} = useTheme()
  return (
    <FadeAnimation>
      <div className={`${themeMode === 'dark' ? '' : 'bg-gray-100 '} min-h-screen py-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
          <Xanimation>
            <h1 className="text-3xl font-bold text-color-dark mb-6">
              Política de Privacidad
            </h1>
          </Xanimation>
          <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-white '} p-6 rounded-lg shadow-md`}>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed`}>
              En Wander Whiskers, reconocemos la importancia de tu privacidad y
              estamos comprometidos a protegerla. Esta Política de Privacidad
              describe las prácticas que seguimos con respecto a la
              recopilación, el uso y la divulgación de información personal que
              nos proporcionas cuando visitas nuestro sitio web.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Recopilamos información personal que nos proporcionas de forma
              voluntaria, como tu nombre, dirección de correo electrónico y otra
              información de contacto cuando te registras en nuestro sitio,
              completas formularios en línea o nos contactas por correo
              electrónico.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Utilizamos la información personal que recopilamos para fines de
              administración del sitio, mejorar nuestros productos y servicios,
              y personalizar la experiencia del usuario. No compartiremos tu
              información personal con terceros sin tu consentimiento, excepto
              cuando sea necesario para cumplir con la ley o proteger nuestros
              derechos.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Este sitio web puede contener enlaces a sitios web de terceros.
              Esta Política de Privacidad no se aplica a la recopilación de
              información por parte de terceros a través de sus propios sitios
              web. Te recomendamos revisar las políticas de privacidad de estos
              sitios web de terceros antes de proporcionarles tu información
              personal.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Esta Política de Privacidad puede ser modificada en cualquier
              momento sin previo aviso. Es tu responsabilidad revisar
              periódicamente esta política para asegurarte de estar al tanto de
              cualquier cambio.
            </p>
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
};

export default PrivacyPage;
