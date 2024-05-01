import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import {
  Input,
  Stack,
  Button,
  // FormControl,
  // FormLabel,
  Center,
  Box,
  InputRightElement,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { message } from "antd";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("Error al registrarse");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Registro realizado con éxito",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const changeHandler = (e) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/register`,
        user
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("No se pudo registrar el usuario");
      }
      success();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      errorMessage();
    }
  };
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSetError = () => {
    setError("");
  };

  return (
    <Center h="100vh">
      {contextHolder}
      <Box className="w-full md:w-3/5 lg:w-2/4 xl:w-1/3">
        <section>
          <div>
            <form action="" onSubmit={register}>
              {/* {error && (
                <p className=" bg-red-400 rounded-md text-white text-medium py-2 block mb-2 text-center">
                  {error}
                </p>
              )} */}
              <h2 className=" text-lg mb-3 text-color-dark">Registro</h2>
              <Stack spacing={4}>
                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <FaRegUser />
                  </InputLeftAddon>
                  <Input
                    type="text"
                    name="username"
                    autoFocus
                    placeholder="Nombre completo"
                    lefticon={<FaRegUser />}
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                    value={user.username}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    aria-label="Nombre de usuario"
                    autoComplete="both"
                  />
                </InputGroup>

                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <EmailIcon />
                  </InputLeftAddon>
                  <Input
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="Email"
                    pr="2rem"
                    borderradius="none"
                    bordertoprightradius="md"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                    value={user.email}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    aria-label="email"
                    autoComplete="both"
                  />
                </InputGroup>

                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <RiLockPasswordLine />
                  </InputLeftAddon>
                  <Input
                    pr="2rem"
                    type={!showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    name="password"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                    value={user.password}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    aria-label="contraseña"
                    autoComplete="both"
                  />
                  <InputRightElement width="1rem">
                    <Button
                      size="sm"
                      variant="unstyled"
                      onClick={handleClickPassword}
                    >
                      {!showPassword ? (
                        <FaRegEye className="icon" />
                      ) : (
                        <FaRegEyeSlash className="icon" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <RiLockPasswordLine />
                  </InputLeftAddon>

                  <Input
                    pr="2rem"
                    type={!showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                    value={user.confirmPassword}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    aria-label="confirmar contraseña"
                    autoComplete="both"
                  />
                  <InputRightElement width="1rem">
                    <Button
                      size="sm"
                      variant="unstyled"
                      onClick={handleClickConfirmPassword}
                    >
                      {!showConfirmPassword ? (
                        <FaRegEye className="icon" />
                      ) : (
                        <FaRegEyeSlash className="icon" />
                      )}
                    </Button>
                  </InputRightElement>
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
                  Registrarse
                </Button>
              </Stack>
            </form>
            <small className="block mt-4">
              <span className="text-[.9rem]">¿Ya tienes una cuenta?</span>{" "}
              <Link
                to={"/login"}
                className=" text-blue-400 hover:text-blue-500 hover:underline text-[.8rem]"
              >
                Inicia sesión
              </Link>
            </small>
          </div>
        </section>
      </Box>
    </Center>
  );
};

export default Register;
