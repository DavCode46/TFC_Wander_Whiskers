import { EditOutlined } from "@ant-design/icons";
import { MdOutlinePets } from "react-icons/md";

import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "@context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { PET_TYPE, selectData, CONDITION } from "@/data/data.js";
import { InboxOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Drawer,
  Form,
  message,
  Select,
  Input,
  Button,
  Row,
  Space,
  Spin,
  Upload,
} from "antd";
import { FormControl } from "@chakra-ui/react";
import Yanimation from "./Animations/Yanimation/Yanimation";
import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import useTheme from "@context/ThemeContext";

const { Option } = Select;

const { Dragger } = Upload;
const PostDrawer = ({ isEditing, postId, homeButton }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [specie, setSpecie] = useState("");
  // const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);
  const [condition, setCondition] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [error, setError] = useState("Error al crear la publicación");
  const [imageUrl, setImageUrl] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser } = useContext(UserContext);
  // console.log('isSubscribed',currentUser.isSubscribed)
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();
  const { themeMode } = useTheme();

  // useEffect(() => {
  //   if (!token) navigate("login");
  // }, []);

  const provinces = selectData[2].children;
  const handleProvinceChange = (value) => {
    const selectedProvinceValue = value;
    setSelectedProvince(selectedProvinceValue);
  };

  const props = {
    name: "file",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
        // console.log("droppedFile", info.dataTransfer.files[0]);
        setImage(info.file);
      }
      if (status === "done") {
        // message.success(`${info.file.name} Imagen Subida satisfactoriamente.`);
        setImage(info.file);
      } else if (status === "error") {
        message.error(`${info.file.name} Error al subir la imagen.`);
        // console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      const droppedFile = e.dataTransfer.files[0];
      setImage(droppedFile);
      // console.log("droppenFile", droppedFile);
    },
    // multiple: false,
    listType: "picture",
    showUploadList: { showRemoveIcon: true },

    action: `${import.meta.env.VITE_REACT_APP_URL}/posts`,

    iconRender: () => {
      return <Spin></Spin>;
    },
    progress: {
      size: 3,
      strokeColor: {
        "0%": "#f0f",
        "100%": "#ff0",
      },
      style: { top: 12 },
    },
    accept: ".png,.jpeg,.jpg,.webp,.avif",
  };
  const create = async (values) => {
    const { title, content, province, specie, condition } = values;
    console.log("image", image);
    const post = new FormData();
    post.set("title", title);
    post.set("content", content);
    post.set("location", province);
    post.set("specie", specie);
    post.set("condition", condition);
    post.set("image", image.originFileObj);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/posts`,
        post,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        success();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setImage([]);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      errorMessage();
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/posts/${postId}`
          );
          setTitle(res.data.title);
          setContent(res.data.content);
          setSpecie(res.data.specie);
          setCondition(res.data.condition);
          setSelectedProvince(res.data.location);
          // console.log("res", res);
        } catch (err) {
          setError(err);
        }
      };
      fetchPost();
    }
  }, []);
  const edit = async (values) => {
    const { title, content, province, specie, condition } = values;

    const post = new FormData();
    post.set("title", title);
    post.set("content", content);
    post.set("location", province);
    post.set("specie", specie);
    post.set("condition", condition);
    post.set("image", image.originFileObj);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_URL}/posts/${postId}`,
        post,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        success();
        setTimeout(() => {
          return navigate("/posts");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCustomRequest = (options) => {
    const { file, onSuccess, onError } = options;

    // Simula una carga exitosa para que el Dragger se comporte correctamente
    setTimeout(() => {
      onSuccess("ok");
    }, 0);

    // Manejar la carga del archivo aquí
    handleFileChange({ target: { files: [file] } });
  };
  const handleSetError = () => {
    setError("");
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `${
        !isEditing
          ? "Publicación creada con éxito"
          : "Publicación actualizada con éxito"
      }`,
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || "Ha ocurrido un error",
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}

      {currentUser ? (
        <Button
          className={`${
            themeMode === "dark"
              ? "text-dark-white"
              : "text-blue-400 hover:text-blue-500 "
          } hover:underline text-[.8rem]`}
          onClick={showDrawer}
          icon={
            themeMode === "dark" ? <PlusCircleOutlined /> : <EditOutlined />
          }
          type={
            homeButton && !themeMode === "dark"
              ? "default"
              : themeMode === "dark"
              ? "primary"
              : undefined
          }
        >
          {!isEditing && !homeButton
            ? "Publicar anuncio"
            : homeButton
            ? "Reportar mascota perdida"
            : "Editar anuncio"}
        </Button>
      ) : (
        ""
      )}

      <Drawer
        loading={true}
        className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div
              className={`${
                themeMode === "dark" ? "text-dark-white" : ""
              } flex items-center mt-4`}
            >
              {isEditing ? "Actualizar anuncio" : "Publicar anuncio"}
              {themeMode === "light" ? (
                <img
                  src={LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              ) : (
                <img
                  src={DARK_LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              )}
            </div>
          </Yanimation>
        }
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <FadeAnimation>
          <Form
            layout="vertical"
            onFinish={!isEditing ? create : edit}
            encType="multipart/form-data"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  initialValue={`${isEditing ? title : ""}`}
                  label="Nombre de la mascota"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduce el nombre de la mascota",
                    },
                  ]}
                >
                  <Input
                    addonBefore={
                      <MdOutlinePets
                        className={`${
                          themeMode === "dark" ? "text-dark-white" : ""
                        }`}
                      />
                    }
                    placeholder="Nombre de la mascota"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize="sm"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      handleSetError();
                    }}
                    aria-label="Nombre de la mascota"
                    autoComplete="both"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="condition"
                  initialValue={`${
                    isEditing ? condition : "Estado de la mascota"
                  }`}
                  label="Estado de la mascota"
                  rules={[
                    {
                      message: "Por favor introduce el estado de la mascota",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    size="sm"
                    fontSize="sm"
                    dropdownStyle={{
                      backgroundColor: themeMode === "dark" ? "#1F2E35" : "",
                    }}
                    _focus={{ outline: "none", border: "none" }}
                    onChange={(value) => {
                      setCondition(value);
                      handleSetError();
                    }}
                    placeholder="Estado de la mascota"
                  >
                    {CONDITION.map((petCondition) => (
                      <Option
                        className={`${
                          themeMode === "dark" ? "text-[#ccc]" : ""
                        }`}
                        key={petCondition}
                        value={petCondition}
                      >
                        {petCondition}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="province"
                  label="Provincia"
                  initialValue={`${isEditing ? selectedProvince : "Provincia"}`}
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduce la provincia",
                    },
                  ]}
                >
                  <Select
                    // listItemHeight={10}
                    // listHeight={250}
                    virtual={false}
                    size="sm"
                    onChange={(value) => {
                      handleProvinceChange(value);
                      handleSetError();
                    }}
                    dropdownStyle={{
                      backgroundColor: themeMode === "dark" ? "#1F2E35" : "",
                    }}
                    fontSize="sm"
                    // _focus={{ outline: "none", border: "none" }}
                    placeholder="Provincia"
                  >
                    {provinces.map((province) => (
                      <Option
                        className={`${
                          themeMode === "dark" ? "text-[#ccc]" : ""
                        }`}
                        key={province.value}
                        value={province.value}
                      >
                        {province.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="specie"
                  initialValue={`${isEditing ? specie : "Especie"}`}
                  label="Especie de la mascota"
                  rules={[
                    {
                      message: "Por favor introduce la especie de la mascota",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    size="sm"
                    fontSize="sm"
                    dropdownStyle={{
                      backgroundColor: themeMode === "dark" ? "#1F2E35" : "",
                    }}
                    _focus={{ outline: "none", border: "none" }}
                    onChange={(value) => {
                      setSpecie(value);
                      handleSetError();
                    }}
                    placeholder="Especie"
                  >
                    {PET_TYPE.map((pet) => (
                      <Option
                        className={`${
                          themeMode === "dark" ? "text-[#ccc]" : ""
                        }`}
                        key={pet}
                        value={pet}
                      >
                        {pet}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="content"
                  initialValue={`${isEditing ? content : ""}`}
                  label="Descripción"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca su mensaje",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Descripción"
                    resize="none"
                    rows={6}
                    _focus={{ outline: "none", border: "none" }}
                    fontSize="sm"
                    onChange={(e) => {
                      setContent(e.target.value);
                      handleSetError();
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="image"
                  label="Imagen"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca una imagen",
                    },
                  ]}
                >
                  <FormControl id="fileUpload">
                    <Dragger {...props} customRequest={handleCustomRequest}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p
                        className={`${
                          themeMode === "dark" ? "text-dark-white" : ""
                        }`}
                      >
                        Haz click o arrastra una imagen
                      </p>
                      <p
                        className={`${
                          themeMode === "dark" ? "text-dark-white" : ""
                        }`}
                      >
                        La imagen debe ser en formato PNG, JPG, JPEG, WEBP o
                        AVIF
                      </p>
                    </Dragger>
                  </FormControl>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <button
                  className={`${
                    themeMode === "dark"
                      ? " bg-gray-400 hover:bg-transparent text-white"
                      : "text-color-dark"
                  } border rounded-md py-1 px-3 transition-all duration-300`}
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`${
                    themeMode === "dark"
                      ? "bg-dark-primary hover:bg-a-6"
                      : "bg-color-btn hover:bg-color-btnHover"
                  } transition-all duration-300  text-white px-3 py-1 rounded-md mt-5'`}
                >
                  {!isEditing ? "Publicar anuncio" : "Actualizar anuncio"}
                </button>
              </Space>
            </Form.Item>
          </Form>
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default PostDrawer;
