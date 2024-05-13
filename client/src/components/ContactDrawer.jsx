import { useState, useRef, useContext } from "react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import LOGO from "@images/logo/1.svg";
import emailjs from "@emailjs/browser";
import Confetti from "react-confetti";
import { UserContext } from "@/context/UserContext";
import { FaRegUser } from "react-icons/fa";

import Yanimation from "@/components/Animations/Yanimation/Yanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Drawer,
  Input,
  FloatButton,
  Row,
  Space,
} from "antd";
import { QuestionOutlined } from "@ant-design/icons";

const ContactDrawer = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const form = useRef();
  const [error, setError] = useState("Ha ocurrido un error");
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  //   const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    if (isSent) setIsSent(false);
  };
  const handleSetError = () => {
    setError("");
  };
  //   const success = () => {
  //     messageApi.open({
  //       type: "success",
  //       content: "Mensaje enviado con éxito",
  //     });
  //     onClose(); // Cierra el Drawer
  //   };

  //   const errorMessage = () => {
  //     messageApi.open({
  //       type: "error",
  //       content: error,
  //     });
  //   };

  //   const handleSetError = () => {
  //     setError("");
  //   };

  const handleSubmit = () => {
    // e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateEmailParams = {
      from_name: name,
      from_email: email,
      contact_number: phone,
      to_name: "Wander Whiskers",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateEmailParams, publicKey)
      .then(() => {
        console.log("Email successfully sent!");
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");
        setIsSent(true);
        // setTimeout(() => {
        //   setIsSent(false);
        // }, 6000);
      })
      .catch((err) => {
        console.log("Error sending email:", err);
      });
  };

  return (
    <>
      {/* {contextHolder} */}
      <FloatButton onClick={showDrawer} icon={<QuestionOutlined />} />
      <Drawer
        title={
          <Yanimation>
            <div className="flex items-center mt-4">
              Formulario de contacto
              <img
                src={LOGO}
                alt="wander whiskers logo"
                className="w-[4rem] h-auto"
              />
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
          {!isSent ? (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="Tu nombre completo"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce tu nombre",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={<FaRegUser />}
                      placeholder="Por favor introduce tu nombre"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Teléfono"
                    rules={[
                      {
                        type: "tel",
                        message: "Por favor introduce un teléfono válido",
                      },
                      {
                        required: true,
                        message: "Por favor introduce tu teléfono",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={<PhoneIcon />}
                      placeholder="Por favor introduce tu teléfono"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        message: "Por favor introduce un email válido",
                      },
                      {
                        required: true,
                        message: "Por favor introduce tu email",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={<EmailIcon />}
                      placeholder="Por favor introduce tu email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="message"
                    label="Mensaje"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduzca su mensaje",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Su mensaje"
                      resize="none"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button onClick={onClose}>Cancelar</Button>
                  <button
                    type="submit"
                    className="bg-color-btn hover:bg-color-btnHover transition-all duration-300  text-white px-3 py-1 rounded-md"
                  >
                    ¡Enviar mensaje!
                  </button>
                </Space>
              </Form.Item>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <h3 className="text-green-500 text-xl font-bold mb-4">
                ¡Mensaje enviado con éxito!
              </h3>
              <p>¡Gracias por contactarnos!</p>
              <Button
                className="bg-color-btn hover:bg-color-btnHover transition-all duration-300  text-white px-3 py-1 rounded-md mt-5"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </div>
          )}
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default ContactDrawer;
