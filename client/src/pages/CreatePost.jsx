import {
  Select,
  Input,
  InputGroup,
  Stack,
  Button,
  FormControl,
  Box,
  Textarea,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { MdOutlinePets } from "react-icons/md";

import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { PET_TYPE, locationData, CONDITION } from "@/data/data.js";
import { InboxOutlined } from "@ant-design/icons";
import { message, Spin, Upload } from "antd";
const { Dragger } = Upload;

const CreatePost = () => {
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
  const handleProvinceChange = (event) => {
    const selectedProvinceValue = event.target.value;
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
  const create = async (e) => {
    e.preventDefault();

    const post = new FormData();
    post.set("title", title);
    post.set("content", content);
    post.set("location", selectedProvince);
    post.set("specie", specie);
    post.set("condition", condition);
    post.set("image", image);
    console.log(image);
    console.log(title);
    console.log(content);
    console.log(selectedProvince);
    console.log(condition);
    console.log(specie);

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


  return (
    <section className="flex justify-center items-center mb-[4rem] md:h-[70vh] lg:h-screen lg:mb-[10rem] ">
      <Box className="w-full md:w-3/5 lg:w-2/4 xl:w-1/3">
        {contextHolder}
        <section className="form">
          <div className=" mt-[7rem]">
            <h2>Publicar anuncio</h2>
            {/* {error && (
              <p className=" bg-red-400 rounded-md text-white text-medium py-2 block mb-2 text-center">
                {error}
              </p>
            )} */}
            <form action="" onSubmit={create}>
              <Stack spacing={4}>
                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <MdOutlinePets />
                  </InputLeftAddon>
                  <Input
                    type="text"
                    name="petName"
                    placeholder="Nombre de la mascota"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize='sm'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      handleSetError();
                    }}
                    aria-label="Nombre de la mascota"
                    autoComplete="both"
                  />
                </InputGroup>
                <InputGroup>
                  <Select
                    size="sm"
                    name="condition"
                    fontSize='sm'
                    _focus={{ outline: "none", border: "none" }}
                    value={condition}
                    onChange={(e) => {
                      setCondition(e.target.value);
                      handleSetError()
                    }}
                  >
                    <option value="condition">Estado de la mascota</option>
                    {CONDITION.map((petCondition) => (
                      <option key={petCondition} value={petCondition}>
                        {petCondition}
                      </option>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    name="breed"
                    fontSize='sm'
                    _focus={{ outline: "none", border: "none" }}
                    value={specie}
                    onChange={(e) => {
                      setSpecie(e.target.value);
                      handleSetError()
                    }}
                  >
                    <option value="specie">Especie</option>
                    {PET_TYPE.map((pet) => (
                      <option key={pet} value={pet}>
                        {pet}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <PhoneIcon color="gray.300" />
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono de contacto"
                    width="100%"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize='sm'
                    aria-label="Teléfono de contacto"
                    autoComplete="both"
                  />
                  <Select
                    size="sm"
                    name="province"
                    value={selectedProvince}
                    onChange={(e) => {
                      handleProvinceChange(e);
                      handleSetError()
                    }}
                    fontSize='sm'
                    _focus={{ outline: "none", border: "none" }}
                  >
                    <option value="province">Provincia</option>
                    {provinces.map((province) => (
                      <option key={province.value} value={province.value}>
                        {province.label}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup size="sm">
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1rem"
                  >
                    <EmailIcon color="gray.300" />
                  </InputLeftAddon>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email de contacto"
                    width="100%"
                    size="sm"
                    _focus={{ outline: "none", border: "none" }}
                    fontSize='sm'
                    aria-label="Email de contacto"
                    autoComplete="both"
                  />
                </InputGroup>

                <FormControl id="description">
                  {/* <FormLabel>Descripción</FormLabel> */}
                  <Textarea
                    name="description"
                    placeholder="Descripción"
                    resize="none"
                    rows={6}
                    _focus={{ outline: "none", border: "none" }}
                    fontSize='sm'
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      handleSetError()
                    }}
                  />
                </FormControl>
                <FormControl id="fileUpload">
                  <Dragger {...props} customRequest={handleCustomRequest}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Haz clic o arrastra archivos a esta área para cargarlos.
                    </p>
                    <p className="ant-upload-hint">
                      Solo soporta archivos únicos. No se permiten
                      archivos de más de 2MB.
                    </p>
                  </Dragger>
                </FormControl>

                <Button
                  type="submit"
                  bg={"btn"}
                  color={"white"}
                  _hover={{ bg: "btnHover" }}
                  w="100%"
                  size="sm"
                >
                  Crear anuncio
                </Button>
              </Stack>
            </form>
          </div>
        </section>
      </Box>
    </section>
  );
};

export default CreatePost;
