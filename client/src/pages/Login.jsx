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
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { message, Input } from "antd";
import { UserContext } from "@/context/userContext";

import axios from "axios";
import RegisterDrawer from "@/components/RegisterDrawer";

const Login = () => {
  const [show, setShow] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
      content: error,
    });
  };

  return (
    <Center h="100vh">
      {contextHolder}
      <Box className="w-full md:w-3/5 lg:w-2/4 xl:w-1/3">
        <section>
          <div>
            <h2 className=" text-lg mb-3 text-color-dark">Login</h2>
            <form action="" onSubmit={login}>
              {/* {error && (
                <p className=" bg-red-400 rounded-md text-white text-medium py-2 block mb-2 text-center">
                  {error}
                </p>
              )} */}
              <Stack spacing={4}>
                <InputGroup size="sm">
                  {/* <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <EmailIcon />
                  </InputLeftAddon> */}
                  
                  <Input
                   addonBefore={<EmailIcon />}
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="Email"
                    pr="2rem"
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
                    autoComplete="both"
                  />
                </InputGroup>
                <InputGroup size="sm">
                  {/* <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <RiLockPasswordLine />
                  </InputLeftAddon> */}
                  <Input.Password
                  addonBefore={<RiLockPasswordLine />}
                    pr="2rem"
                    type={!show ? "text" : "password"}
                    placeholder="Contraseña"
                    name="password"
                    size="sm"
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
                    autoComplete="both"
                  />
                  {/* <InputRightElement width="1rem">
                    <Button
                      size="sm"
                      variant="unstyled"
                      onClick={handleClick}
                      borderradius="none"
                      bordertoprightradius="md"
                    >
                      {!show ? (
                        <FaRegEye className="icon" />
                      ) : (
                        <FaRegEyeSlash className="icon" />
                      )}
                    </Button>
                  </InputRightElement> */}
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
              <span className="text-[.9rem]">¿Aún no tienes una cuenta?</span>{" "}
              {/* <Link
                to={"/register"}
                className=" text-blue-400 hover:text-blue-500 hover:underline text-[.8rem]"
              >
                Regístrate
              </Link> */}
              <RegisterDrawer />
            </small>
          </div>
        </section>
      </Box>
    </Center>
  );
};

export default Login;
