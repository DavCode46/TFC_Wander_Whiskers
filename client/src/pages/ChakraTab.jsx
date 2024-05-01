import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Input,
    Stack,
    // Button,
    Center,
    Box,
    InputRightElement,
    InputGroup,
    InputLeftAddon,
    CircularProgress,
  } from "@chakra-ui/react";
  import { useContext, useState, useEffect } from "react";
  import { EmailIcon } from "@chakra-ui/icons";
  import { RiLockPasswordLine } from "react-icons/ri";
  import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
  
  import { UserContext } from "../context/userContext";
  import axios from "axios";
  import { Link, useNavigate, useParams } from "react-router-dom";
  
  import DeletePost from "./DeletePost";
  import { CheckOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
  
  import { UploadOutlined } from "@ant-design/icons";
  import { Avatar, Image, Button, message, Upload } from "antd";
  import DeleteUser from "./DeleteUser";
  
  const ChakraTab = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [username, setUsername] = useState(undefined);
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("Ha ocurrido un error");
    const [profileImageTouched, setProfileImageTouched] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
  
    const [messageApi, contextHolder] = message.useMessage();
  
    const navigate = useNavigate();
  
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
  
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, []);
  
    useEffect(() => {
      if (imageUploaded) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }, [imageUploaded]);
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
        );
        const { username, email, profileImage } = res.data;
        // console.log("Username:", username);
        // console.log("Email:", email);
        // console.log("Profile Image:", profileImage);
        // console.log('res', res.data)
        // console.log(res.data);
        // console.log('user id', currentUser.id)
        const formattedUsername = capitalizeWords(username);
        setUsername(formattedUsername);
        setEmail(email);
        setProfileImage(profileImage);
        console.log(res.data);
        console.log('id', currentUser.id)
      };
      fetchUser();
    }, []);
  
    const updateProfile = async (e) => {
      e.preventDefault();
  
      try {
        const data = new FormData();
        data.set("username", username);
        data.set("email", email);
        data.set("currentPassword", currentPassword);
        data.set("newPassword", newPassword);
        data.set("confirmNewPassword", confirmNewPassword);
        console.log("ruta", `${import.meta.env.VITE_REACT_APP_URL}/users/edit`);
  
        const res = await axios.patch(
          `${import.meta.env.VITE_REACT_APP_URL}/users/edit`,
          data,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          success();
          setTimeout(() => {
            navigate('/logout')
          }, 1000);
        }
      } catch (err) {
        setError(err.response.data.message);
        errorMessage();
      }
    };
  
    const { id } = useParams();
  
    console.log(id);
  
    console.log(`${import.meta.env.VITE_REACT_APP_URL}/posts/users/${id}`);
    console.log(token);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/posts/users/${id}`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("res", response.data);
  
          setPosts(response.data);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };
  
      fetchPosts();
    }, [id]);
  
    // useEffect(() => {
    //   const getUser = async () => {
    //     const res = await axios.get(
    //       `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`,
    //       { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    //     );
    //     const { username, email, profileImage } = res.data;
  
    //     setUsername(username);
    //     setEmail(email);
    //     setProfileImage(profileImage);
    //     console.log("profileImage", profileImage);
    //   };
    //   getUser();
    // }, []);
  
    if (isLoading)
      return (
        <CircularProgress
          isIndeterminate
          size="100px"
          thickness="7px"
          aria-label="cargando"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      );
  
    const handleClickCurrentPassword = () =>
      setShowCurrentPassword(!showCurrentPassword);
    const handleClickNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleClickConfirmNewPassword = () =>
      setShowConfirmNewPassword(!showConfirmNewPassword);
  
    const capitalizeWords = (str) => {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
  
    const handleSetError = () => {
      setError("");
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
      setProfileImageTouched(false);
      console.log(profileImage);
      try {
        const data = new FormData();
        fileList.forEach((file) => {
          data.append("profileImage", file);
        });
        setUploading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_URL}/users/change-image`,
          data,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfileImageTouched(res?.data.profileImage);
        message.success("¡Carga exitosa!");
        setFileList([]);
        setImageUploaded(true);
      } catch (err) {
        console.log(err);
        message.error("¡Error al cargar la imagen!");
      } finally {
        // Desactivar la carga
        setUploading(false);
      }
    };
  
    const props = {
      onRemove: (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      },
      beforeUpload: (file) => {
        setFileList([...fileList, file]);
        return false;
      },
      fileList,
      showRemoveIcon: true,
    };
  
    const success = () => {
      messageApi.open({
        type: "success",
        content: "Perfil editado con éxito",
      });
    };
    const errorMessage = () => {
      messageApi.open({
        type: "error",
        content: error,
      });
    };
  
  
    return (
      <section>
        {contextHolder}
        <div className="w-full h-[22rem] relative mx-auto">
          <div className="flex flex-col justify-between items-center gap-7">
            <img
              className="w-[7rem] h-[7rem] rounded-full object-cover"
              src={`${
                import.meta.env.VITE_REACT_APP_ASSETS_URL
              }/uploads/${profileImage}`}
            />
            <div className="flex justify-center items-center">
              <DeleteUser userID={currentUser.id} text='Eliminar perfil de usuario'/>
            </div>
            <div className="flex flex-col">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
              </Upload>
  
              <Button
                type="primary"
                className=" bg-color-secondary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
              >
                {uploading ? "Cambiando imagen" : "Cambiar imagen"}
              </Button>
            </div>
          </div>
  
          <div className="text-lg text-center font-semibold mt-4 w-full">
            {username}
          </div>
        </div>
  
        <Tabs
          variant="unstyled"
          w={{ base: "100%", md: "80%", lg: "80%" }}
          margin={"auto"}
        >
          <TabList
            w="100%"
            mb={4}
            borderBottom="2px solid"
            borderColor="gray.200"
            display="flex"
            justifyContent="space-evenly"
          >
            <Tab
              sx={{
                fontSize: ".8rem",
                marginTop: "1rem",
                _selected: {
                  color: "white",
                  borderRadius: ".4rem",
                  bg: "btn",
                  paddingY: ".7rem",
                  paddingX: ".7rem",
                  transition: "background-color 0.3s ease-in-out",
                },
                _focus: { boxShadow: "none" },
                _active: { bg: "btnHover" },
              }}
            >
              Mis publicaciones
            </Tab>
            <Tab
              sx={{
                fontSize: ".8rem",
                marginTop: "1rem",
                _selected: {
                  color: "white",
                  borderRadius: ".4rem",
                  bg: "btn",
                  paddingY: ".7rem",
                  paddingX: ".7rem",
                  transition: "background-color 0.3s ease-in-out",
                },
                _focus: { boxShadow: "none" },
                _active: { bg: "btnHover" },
              }}
            >
              Datos de perfil
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <p>Contenido de la pestaña Mis Publicaciones</p> */}
  
              <section>
                {posts.length ? (
                  <div className=" w-full md:w-[80%] m-auto grid lg:grid-cols-2 lg:items-center lg:gap-4">
                    {posts.map((post, index) => {
                      return (
                        <article
                          key={index}
                          className={`relative w-full h-[12rem] border border-color-primary mb-12 p-3 rounded-lg  overflow-hidden group transition-all duration-300 hover:card__selected hover:shadow-2xl`}
                        >
                          <div className="w-full h-full">
                            <img
                              src={`${
                                import.meta.env.VITE_REACT_APP_ASSETS_URL
                              }/uploads/${post.image}`}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover rounded-md"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 transition-opacity duration-300">
                              <h5 className="text-white text-center">
                                {post.title}
                              </h5>
                              <div className="flex gap-2 justify-around lg:justify-evenly mt-3 text-white hover:text-white">
                                <Link to={`/post/${post._id}/detail`}>
                                  <Button
                                    type="dashed"
                                    icon={<EyeOutlined />}
                                    className="text-white"
                                  >
                                    Ver
                                  </Button>
                                </Link>
                                <Link to={`/posts/${post._id}/edit`}>
                                  <Button
                                    icon={<EditOutlined />}
                                    className="text-white"
                                  >
                                    Editar
                                  </Button>
                                </Link>
                                <DeletePost postID={post._id} />
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <h2
                    className="text-center mb-[15vh] mt-10"
                    aria-label="No posts"
                  >
                    No se ha encontrado ningún post
                  </h2>
                )}
              </section>
  
              {/* <ProfilePosts /> */}
            </TabPanel>
            <TabPanel>
              <Center h="100vh">
                <Box className="w-full md:w-3/5">
                  <section>
                    <div>
                      <form
                        action=""
                        className=" -mt-[15rem]"
                        onSubmit={updateProfile}
                      >
                        <h2 className=" mb-3 text-lg text-color-dark">
                          Actualizar datos
                        </h2>
                        {/* {error && (
                          <p className=" bg-red-400 rounded-md text-white text-medium py-2 block mb-2 text-center">
                            {error}
                          </p>
                        )} */}
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
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                                handleSetError();
                              }}
                              autoComplete="both"
                              aria-label="Nombre de usuario"
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
                              borderRadius="none"
                              borderTopRightRadius="md"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                handleSetError();
                              }}
                              autoComplete="both"
                              aria-label="email de contacto"
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
                              type={!showCurrentPassword ? "text" : "password"}
                              placeholder="Contraseña actual"
                              name="currentPassword"
                              size="sm"
                              value={currentPassword}
                              onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                handleSetError();
                              }}
                              autoComplete="both"
                              aria-label="contraseña actual"
                            />
                            <InputRightElement width="1rem">
                              <button
                                className=" mr-7"
                                onClick={handleClickCurrentPassword}
                              >
                                {!showCurrentPassword ? (
                                  <FaRegEye className="icon" />
                                ) : (
                                  <FaRegEyeSlash className="icon" />
                                )}
                              </button>
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
                              type={!showNewPassword ? "text" : "password"}
                              placeholder="Nueva contraseña"
                              name="newPassword"
                              size="sm"
                              value={newPassword}
                              onChange={(e) => {
                                setNewPassword(e.target.value);
                                handleSetError();
                              }}
                              aria-label="nueva contraseña"
                              autoComplete="both"
                            />
                            <InputRightElement width="1rem">
                              <button
                                className="mr-7"
                                onClick={handleClickNewPassword}
                              >
                                {!showNewPassword ? (
                                  <FaRegEye className="icon" />
                                ) : (
                                  <FaRegEyeSlash className="icon" />
                                )}
                              </button>
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
                              type={!showConfirmNewPassword ? "text" : "password"}
                              placeholder="Confirmar contraseña"
                              name="confirmNewPassword"
                              size="sm"
                              value={confirmNewPassword}
                              onChange={(e) => {
                                setConfirmNewPassword(e.target.value);
                                handleSetError();
                              }}
                              autoComplete="both"
                              aria-label="confirmar contraseña"
                            />
                            <InputRightElement width="1rem">
                              <button
                                className="mr-7"
                                onClick={handleClickConfirmNewPassword}
                              >
                                {!showConfirmNewPassword ? (
                                  <FaRegEye className="icon" />
                                ) : (
                                  <FaRegEyeSlash className="icon" />
                                )}
                              </button>
                            </InputRightElement>
                          </InputGroup>
                          <button
                            className="bg-color-btn hover:bg-color-btnHover text-white py-1 rounded-md"
                            icon={<CheckOutlined />}
                            type="submit"
                          >
                            Actualizar
                          </button>
                        </Stack>
                      </form>
                    </div>
                  </section>
                </Box>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    );
  };
  
  export default ChakraTab;
  