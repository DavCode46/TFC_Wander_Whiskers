import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import React from "react";
import useTheme from '@context/ThemeContext'
const LegalPage = () => {
  const {themeMode} = useTheme()
  return (
    <FadeAnimation>
       <div className={`${themeMode === 'dark' ? '' : 'bg-gray-100 '} min-h-screen py-12`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Xanimation>
            <h1 className="text-3xl font-bold text-color-dark mb-6">
              Aviso Legal
            </h1>
          </Xanimation>
          <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-white '} p-6 rounded-lg shadow-md`}>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed`}>
              Este es un aviso legal estándar que describe las condiciones de
              uso de este sitio web. Al acceder a este sitio web, aceptas estos
              términos y condiciones en su totalidad. No utilices este sitio web
              si no estás de acuerdo con todos los términos y condiciones
              establecidos en esta página.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              La información en este sitio web se proporciona tal cual, sin
              ninguna garantía de integridad, precisión, puntualidad o de los
              resultados obtenidos del uso de esta información, y sin garantía
              de ningún tipo, expresa o implícita. Bajo ninguna circunstancia
              seremos responsables de ningún daño, incluyendo, sin limitación,
              daños directos o indirectos, o cualquier daño que surja del uso o
              pérdida de uso de este sitio web.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Este sitio web y su contenido son propiedad de Wander Whiskers y
              están protegidos por las leyes de propiedad intelectual
              correspondientes. Queda prohibida la reproducción, distribución,
              modificación o cualquier otro uso de los contenidos de este sitio
              web sin el consentimiento previo por escrito de Wander Whiskers.
            </p>
            <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700 '} leading-relaxed mt-4`}>
              Este aviso legal puede ser modificado en cualquier momento sin
              previo aviso. Es tu responsabilidad revisar periódicamente este
              aviso legal para asegurarte de estar al tanto de cualquier cambio.
            </p>
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
};

export default LegalPage;
