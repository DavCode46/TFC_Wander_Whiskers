import { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Empty, FloatButton, Upload, message } from "antd";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import UserDrawer from "@components/UserDrawer";
import {
  CheckOutlined,
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DownOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { CircularProgress } from "@chakra-ui/react";
import DeletePost from "./DeletePost";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import PostDrawer from "@/components/PostDrawer";
import useTheme from '@context/theme'
const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");

  const [error, setError] = useState("Ha ocurrido un error");
  const [profileImageTouched, setProfileImageTouched] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const {themeMode} = useTheme()
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

      const formattedUsername = capitalizeWords(username);
      console.log(username)
      console.log(formattedUsername)
      setUsername(formattedUsername);
      setEmail(email);
      setProfileImage(profileImage);
    };
    fetchUser();
  }, [currentUser.id, token]);

  const { id } = useParams();

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

        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [id]);

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
    status: themeMode === 'dark' ? 'error' : ''
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
    <section className="w-full p-10 m-auto">
      {/* <ChakraTab /> */}
      <div className="w-full h-[22rem] relative mx-auto font-grotesk">
        <div className="flex flex-col justify-between items-center gap-7">
          <Xanimation>
            <img
              className="w-[7rem] h-[7rem] rounded-full object-cover"
              src={`${
                import.meta.env.VITE_REACT_APP_ASSETS_URL
              }/uploads/${profileImage}`}
            />
          </Xanimation>
          {/* <Link to={`/orders/users/${currentUser.id}`} className=" px-3 py-1 border border-color-btn bg-color-btn hover:bg-color-btnHover hover:text-white text-white rounded-md transition-all duration-300">Mis pedidos</Link> */}

          {/* <Link to={`/orders/users/${currentUser.id}`}>
            {" "}
            <FloatButton icon={<ProfileOutlined />} />
          </Link> */}

          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <FadeAnimation delay={0.2}>
              <div className="flex flex-col gap-3 justify-center items-center">
                <DeleteUser
                  userID={currentUser.id}
                  text="Eliminar perfil de usuario"
                />
                <UserDrawer
                  email={email}
                  openButton="Editar perfil de usuario"
                />
              </div>
            </FadeAnimation>
            <div className="flex flex-col items-center justify-center">
              <FadeAnimation delay={0.4}>
                <Upload {...props}> 
                  <Button type={`${themeMode === 'dark' ? 'primary' : 'default'}`} icon={<UploadOutlined /> }>Seleccionar imagen</Button>
                </Upload>

                <Button
                  type='primary'
                  className={`${themeMode === 'dark' ? '' : 'bg-color-secondary'} ml-5`}
                  onClick={handleUpload}
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{
                    marginTop: 16,
                  }}
                >
                  {uploading ? "Cambiando imagen" : "Cambiar imagen"}
                </Button>
              </FadeAnimation>
            </div>
          </div>
        </div>

        <div className={`${themeMode === 'dark' ? 'text-[#ccc]' : ''} text-lg text-center font-semibold mt-4 w-full`}>
          <Xanimation duration={1}>{username}</Xanimation>
        </div>
      </div>
      <section>
        <FadeAnimation>
          {posts.length ? (
            <div className=" w-full md:w-[80%] m-auto grid xl:grid-cols-2 lg:items-center lg:gap-4">
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
                        <h5 className="text-white text-center">{post.title}</h5>
                        <div className="flex gap-2 justify-around lg:justify-evenly mt-3 text-white hover:text-white">
                          <Link to={`/post/${post._id}/detail`}>
                            <Button
                              type={`${themeMode === 'dark' ? 'primary' : 'default'}`}
                              icon={<EyeOutlined />}
                              className={`${themeMode === 'dark' ? '' : 'text-color-btn hover:text-color-btnHover'}`}
                            >
                              <div className="hidden md:inline">Ver</div>
                            </Button>
                          </Link>
                          {/* <Link to={`/posts/${post._id}/edit`}>
                            <Button
                              icon={<EditOutlined />}
                              className="text-color-btn hover:text-color-btnHover"
                            >
                              <div className="hidden md:inline">Editar</div>
                            </Button>
                          </Link> */}
                          <PostDrawer isEditing postId={post._id}/>
                          <DeletePost postID={post._id} />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center md:min-h-[40rem]">
              <FadeAnimation delay={0.3}>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                  description={
                    <div>
                      <span className="mt-[3rem]">
                        No se han encontrado{" "}
                        <span className="text-color-btn">anuncios</span>
                      </span>
                      <div className="mt-[3rem]">
                        {" "}
                        {/* Espaciado entre el texto y el botón */}
                        <Link
                          className="bg-color-btn text-white px-3 py-2 rounded-md hover:bg-color-btnHover hover:text-white transition-all duration-300"
                          to="/create-post"
                        >
                          Publicar anuncio
                        </Link>
                      </div>
                    </div>
                  }
                />
              </FadeAnimation>
            </div>
          )}
        </FadeAnimation>
      </section>
      {/* <motion.div
        className="slide"
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 3, ease: [0.2, 1, 0.2, 1] }}
      /> */}
      {/* <motion.div
        className="circle"
        animate={{ width: 0, height: 0, borderRadius: "100%" }}
        exit={{ width: "100%", height: "100%", borderRadius: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      /> */}
    </section>
  );
};

export default Profile;
