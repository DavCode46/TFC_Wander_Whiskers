
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import dog from '@images/dog.jpg'
import cat from '@images/cat.jpg'
import { Link } from "react-router-dom";
import { CircularProgress } from '@chakra-ui/react'


const Hero = () => {
  return (
    <section id="pet-adoption" className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Encuentra tu compañero 
        <span className="text-color-btn mt-2  py-2 px-6 border-8 border-color-btn relative inline-block">
              Peludo
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -top-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -top-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -bottom-5 p-2 bg-color-btn  rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -bottom-5 p-2 bg-color-btn  rounded-full box-content" />
            </span>

        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg">
            <img src={dog} alt="Perro" className="w-full h-auto rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Adopta un perro</h2>
            <p className="text-gray-700 mb-4">Explora nuestra lista de perros esperando un hogar amoroso.</p>
            <Link to='/posts/species/Perro' className="bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white">Ver perros disponibles</Link>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg">
            <img src={cat} alt="Gato" className="w-full h-auto rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Adopta un gato</h2>
            <p className="text-gray-700 mb-4">Descubre nuestros gatos buscando un hogar cariñoso y acogedor.</p>
            <Link to='/posts/species/Gato' className=" bg-color-btn text-white py-2 px-4 rounded-md hover:bg-color-btnHover transition duration-300 hover:text-white">Ver gatos disponibles</Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700">¿Has perdido a tu mascota?</p>
          <Link to='/create-post' className="text-color-btn font-semibold flex items-center justify-center gap-2 mt-4">
            Reportar mascota perdida
            <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
            <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
            <RiCheckboxBlankCircleFill className="text-color-btn text-2xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
