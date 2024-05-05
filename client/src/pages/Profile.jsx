import { useContext, useEffect, useState } from "react";
import ChakraTab from "./ChakraTab";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Empty, Upload, message } from "antd";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import UserDrawer from "@components/UserDrawer";
import {
  CheckOutlined,
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DownOutlined,
  UserOutlined 
} from "@ant-design/icons";
import { CircularProgress } from "@nextui-org/react";
import DeletePost from "./DeletePost";


const Profile = () => {
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
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Profile Image:", profileImage);
      console.log('res', res.data)
      console.log(res.data);
      console.log('user id', currentUser.id)
      const formattedUsername = capitalizeWords(username);
      setUsername(formattedUsername);
      setEmail(email);
      setProfileImage(profileImage);
      console.log(res.data);
      console.log("id", currentUser.id);
    };
    fetchUser();
  }, []);

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
    <section className="w-full p-10 m-auto">
      {/* <ChakraTab /> */}
      <div className="w-full h-[22rem] relative mx-auto">
        <div className="flex flex-col justify-between items-center gap-7">
          <img
            className="w-[7rem] h-[7rem] rounded-full object-cover"
            src={`${
              import.meta.env.VITE_REACT_APP_ASSETS_URL
            }/uploads/${profileImage}`}
          />
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col gap-3 justify-center items-center">
              <DeleteUser
                userID={currentUser.id}
                text="Eliminar perfil de usuario"
              />
              <UserDrawer username={username} email={email} openButton='Editar perfil de usuario'/>
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
        </div>

        <div className="text-lg text-center font-semibold mt-4 w-full">
          {username}
        </div>
      </div>
      <section>
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
                            type="dashed"
                            icon={<EyeOutlined />}
                            className="text-white"
                          >
                            <div className="hidden md:inline">Ver</div>
                          </Button>
                        </Link>
                        <Link to={`/posts/${post._id}/edit`}>
                          <Button
                            icon={<EditOutlined />}
                            className="text-white"
                          >
                            <div className="hidden md:inline">Editar</div>
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
          <div className="flex items-center justify-center md:min-h-[40rem]">
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
          </div>
        )}
      </section>
    </section>
  );
};

export default Profile;
