import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import React from "react";
import useTheme from '@context/ThemeContext'

const CookiesPage = () => {
  const {themeMode} = useTheme()
  return (
    <FadeAnimation>
       <div className={`${themeMode === 'dark' ? '' : 'bg-gray-100 '} min-h-screen py-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
          <Xanimation>
            <h1 className="text-3xl font-bold text-color-dark mb-6">
              Política de Cookies
            </h1>
          </Xanimation>
          <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-white '} p-6 rounded-lg shadow-md`}>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed`}>
              Nuestro sitio web utiliza cookies para mejorar tu experiencia de
              usuario. Al continuar navegando por este sitio, aceptas el uso de
              cookies de acuerdo con esta política.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo cuando visitas nuestro sitio web. Estas cookies nos
              permiten reconocerte y recordar tus preferencias la próxima vez
              que visites nuestro sitio.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Utilizamos cookies de sesión y cookies persistentes en nuestro
              sitio web. Las cookies de sesión se eliminan automáticamente
              cuando cierras tu navegador, mientras que las cookies persistentes
              permanecen en tu dispositivo durante un período de tiempo
              específico o hasta que las elimines manualmente.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Puedes controlar y administrar el uso de cookies en tu navegador.
              Sin embargo, deshabilitar las cookies puede afectar la
              funcionalidad de nuestro sitio web y algunas características
              pueden no funcionar correctamente.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Esta política de cookies puede ser modificada en cualquier momento
              sin previo aviso. Es tu responsabilidad revisar periódicamente
              esta política para asegurarte de estar al tanto de cualquier
              cambio.
            </p>
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
};

export default CookiesPage;
