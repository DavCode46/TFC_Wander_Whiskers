import { Link, useNavigate } from "react-router-dom";
import { EmailIcon } from "@chakra-ui/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import {
  // Input,
  Stack,
  Button,
  Center,
  Box,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { message, Input, Divider } from "antd";
import { UserContext } from "@/context/UserContext";

import axios from "axios";

import UserDrawer from "@/components/UserDrawer";

import LOGO from "@images/logo/5.svg";
import FOOTER_LOGO from "@images/logo/1.svg";
import GOOGLE_ICON from "@images/googleIcon.svg";
import GITHUB_ICON from "@images/githubIcon.svg";
// import {jwt_decode} from 'jwt-decode'
import useTheme from '@context/ThemeContext'
const Login = () => {
  const [show, setShow] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { themeMode, lightTheme, darkTheme } = useTheme();


  const [error, setError] = useState("Error al iniciar sesión");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { setCurrentUser } = useContext(UserContext);
  const handleClick = () => setShow(!show);

  const changeHandler = (e) => {
    setData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSetError = () => {
    setError("");
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/login`,
        data
      );
      const user = await response.data;
      console.log('login response', response)

      setCurrentUser(user);
      success();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Inicio de sesión realizado con éxito",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || 'Ha ocurrido un error',
    });
  };

  return (
    <section >
      
      <Center h="100vh" zIndex={'1000'}>
        {contextHolder}
        <Box className="relative w-full md:w-3/5 lg:w-2/4 xl:w-1/3">
          <section className={`${themeMode === 'dark' ? 'bg-color-bgDarkMode' : 'bg-color-form'} rounded-2xl h-[35rem] flex flex-col items-center justify-center shadow-2xl`}>
            <div className="mt-[3rem]">
              {/* <img
              src={LOGO}
              alt="wander whiskers logo"
              className="w-[5rem] h-auto m-auto"
            /> */}
              <div className="flex flex-col items-center justify-center z-[1000]">
                <h2 className={`${themeMode === 'dark' ? 'text-color-light': 'text-color-dark'} text-lg font-bold`}>
                  Iniciar sesión en Wander Whiskers
                </h2>
                <small className={`${themeMode === 'dark' ? 'text-color-light' : 'text-color-dark'} m-4`}>
                  Bienvenido de nuevo, inicia sesión para continuar
                </small>
                <div className="w-full flex justify-between items-center gap-[.5rem] mb-[1.5rem]">
                  {/* <button className="w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                  <img src={GOOGLE_ICON} alt="" className="w-[1rem]" />
                  Google
                </button> */}
                  {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const credentialResponseDecoded = jwt_decode(credentialResponse.credential)
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}

                  {/* <button className="w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                  <img src={GITHUB_ICON} alt="" className="w-[1rem]" />
                  GitHub
                </button> */}
                </div>
              </div>
              <div className="flex justify-center items-center mb-[1.5rem]">
                {/* <div className="border-t border-gray-400 w-full mr-4"></div>{" "}
                <p className="font-bold text-md">O</p>
                <div className="border-t border-gray-400 w-full ml-4"></div>{" "} */}
                <div className="border-t border-gray-400 w-full ml-4"></div>{" "} 
              </div>

              <form action="" onSubmit={login} className={themeMode === 'dark' ? 'bg-color-bgDarkMode' : 'bg-color-bg'}>

                <Stack spacing={4}>
                  <InputGroup size="xs">
                    <Input
                      addonBefore={<EmailIcon  color={themeMode === 'dark' ? 'white' : 'black'} 
                      fontSize="1rem" 
                      />}
                      size="xs"
                      type="email"
                      name="email"
                      placeholder="Email"
                      pr="2rem"
                      className={`${themeMode === 'dark' && 'bg-color-bgDarkMode'}`}
                      borderradius="none"
                      bordertoprightradius="md"
                      _focus={{ outline: "none", border: "none" }}
                      fontSize={{ base: "sm", md: "md", lg: "md" }}
                      value={data.email}
                      onChange={(e) => {
                        changeHandler(e);
                        handleSetError();
                      }}
                      aria-label="Email"
                      autoComplete="on"
                    />
                  </InputGroup>
                  <InputGroup size="xs" >
                    <Input.Password
                      addonBefore={<RiLockPasswordLine color={themeMode === 'dark' ? 'white' : 'black'} 
                      fontSize="1rem" 
                      />}
                      pr="2rem"
                      type={!show ? "text" : "password"}
                      placeholder="Contraseña"
                      className={`${themeMode === 'dark' && 'bg-color-bgDarkMode'}`}
                      name="password"
                      size="xs"
                      borderradius="none"
                      bordertoprightradius="md"
                      _focus={{ outline: "none", border: "none" }}
                      fontSize={{ base: "sm", md: "md", lg: "md" }}
                      value={data.password}
                      onChange={(e) => {
                        changeHandler(e);
                        handleSetError();
                      }}
                      aria-label="Contraseña"
                      autoComplete="on"
                    />
                  </InputGroup>
                  <Button
                    type="submit"
                    size="sm"
                    _hover={{ bg: "btnHover" }}
                    _active={{ bg: "blue.600" }}
                    _focus={{ outline: "none" }}
                    color={{ base: "white", md: "white" }}
                    bg="btn"
                  >
                    Iniciar sesión
                  </Button>
                </Stack>
              </form>
              <small className="block mt-4">
                <span className="text-[.8rem]">¿Aún no tienes una cuenta?</span>{" "}
                <UserDrawer isRegistering openButton="Registrarse" />
              </small>
            </div>
            <Divider />
            <div className="flex gap-2 items-center justify-center">
              <p>Secured by Wander Whiskers</p>
              <img
                src={FOOTER_LOGO}
                alt="Logo footer sign in form"
                className="w-[5rem] h-auto"
              />
            </div>
          </section>
        </Box>
      </Center>
    </section>
  );
};

export default Login;
