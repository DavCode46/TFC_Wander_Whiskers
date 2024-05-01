import { Link } from "react-router-dom";

const menuItems = [
  {
    key: "home",
    path: "/",
    label: "Inicio",
  },
  {
    key: "login",
    path: "/login",
    label: "Iniciar Sesión",
  },
  {
    key: "register",
    path: "/register",
    label: "Registrarse",
  },
  {
    key: "logout",
    path: "/logout",
    label: "Cerrar Sesión",
  },
  {
    key: "profile",
    path: "/profile",
    label: "Perfil",
  },
  {
    key: "create-post",
    path: "/create-post",
    label: "Publicar anuncio",
  },
  {
    key: "allposts",
    path: "/posts",
    label: "Anuncios",
  },
  {
    key: "contactUs",
    path: "/contact",
    label: "Contactar",
  },
  {
    key: "help",
    path: "/help",
    label: "Ayuda",
  },
];

const Header = () => {
  return (
    <header className=" pl-5 pr-5">
      <nav className="bg-white w-full h-[10rem] m-auto mt-[5rem] rounded-2xl flex justify-center items-center">
        <ul className="flex justify-between items-center w-full ">
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
