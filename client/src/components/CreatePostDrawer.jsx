// import {
//   Select,
//   Input,
//   InputGroup,
//   Stack,
//   Button,
//   FormControl,
//   Box,
//   Textarea,
//   InputLeftAddon,
//   Text,
// } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdOutlinePets, MdOutlinePublish } from "react-icons/md";

import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { PET_TYPE, locationData, CONDITION } from "@/data/data.js";
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

const { Option } = Select;

const { Dragger } = Upload;
const CreatePostDrawer = () => {
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
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("login");
  }, []);

  const provinces = locationData[1].children;
  const handleProvinceChange = (value) => {
    const selectedProvinceValue = value;
    setSelectedProvince(selectedProvinceValue);
  };

  const props = {
    name: "file",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} Imagen Subida satisfactoriamente.`);
      } else if (status === "error") {
        message.error(`${info.file.name} Error al subir la imagen.`);
        console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      const droppedFile = e.dataTransfer.files[0];
      setImage(droppedFile);
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
    const { title, content, province, specie, condition, image } = values;
    console.log('datos a enviar', values)
    console.log('image', image)
    console.log('title', title)
    console.log('content', content)
    console.log('province', province)
    console.log('specie', specie)
    console.log('condition', condition)

    const post = new FormData();
    post.set("title", title);
    post.set("content", content);
    post.set("location", province);
    post.set("specie", specie);
    post.set("condition", condition);
    post.set("image", image);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/posts`,
        post,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        success();
        setTimeout(() => {
          navigate("/posts");
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
      content: "Publicación creada con éxito",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
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
      <Button
        className="  text-blue-400 hover:text-blue-500 hover:underline text-[.8rem]"
        onClick={showDrawer}
        icon={<PlusCircleOutlined />}
      >
        Publicar anuncio
      </Button>
      <Drawer
        loading={true}
        title="Publicar anuncio"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" onFinish={create}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Nombre de la mascota"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduce el nombre de la mascota",
                  },
                ]}
              >
                <Input
                  addonBefore={<MdOutlinePets />}
                  name="title"
                  placeholder="Nombre de la mascota"
                  size="sm"
                  _focus={{ outline: "none", border: "none" }}
                  fontSize="sm"
                  value={title}
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
                  name="condition"
                  fontSize="sm"
                  _focus={{ outline: "none", border: "none" }}
                  value={condition}
                  onChange={(value) => {
                    setCondition(value);
                    handleSetError();
                  }}
                  placeholder="Estado de la mascota"
                >
                  {CONDITION.map((petCondition) => (
                    <Option key={petCondition} value={petCondition}>
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
                rules={[
                  {
                    required: true,
                    message: "Por favor introduce la provincia",
                  },
                ]}
              >
                <Select
                  size="sm"
                  name="province"
                  value={selectedProvince}
                  onChange={(value) => {
                    handleProvinceChange(value);
                    handleSetError();
                  }}
                  fontSize="sm"
                  _focus={{ outline: "none", border: "none" }}
                  placeholder="Provincia"
                >
                  {provinces.map((province) => (
                    <Option key={province.value} value={province.value}>
                      {province.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="specie"
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
                  name="specie"
                  fontSize="sm"
                  _focus={{ outline: "none", border: "none" }}
                  value={specie}
                  onChange={(value) => {
                    setSpecie(value);
                    handleSetError();
                  }}
                  placeholder="Especie"
                >
                  {PET_TYPE.map((pet) => (
                    <Option key={pet} value={pet}>
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
                label="Descripción"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduzca su mensaje",
                  },
                ]}
              >
                <Input.TextArea
                  name="description"
                  placeholder="Descripción"
                  resize="none"
                  rows={6}
                  _focus={{ outline: "none", border: "none" }}
                  fontSize="sm"
                  value={content}
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
                    <p className="ant-upload-text">
                      Haz click o arrastra una imagen
                    </p>
                    <p className="ant-upload-hint">
                      La imagen debe ser en formato PNG, JPG, JPEG, WEBP o AVIF
                    </p>
                  </Dragger>
                </FormControl>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button onClick={onClose}>Cancelar</Button>
              <button
                type="submit"
                className=" bg-color-btn  text-white px-3 py-1 rounded-md"
              >
                Publicar anuncio
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default CreatePostDrawer;
