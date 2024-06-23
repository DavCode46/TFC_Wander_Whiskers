import React, { useContext, useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import { Link, useNavigate } from "react-router-dom";

import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import useTheme from "@context/ThemeContext";
import { UserContext } from "@/context/UserContext";
const UsersManagement = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const { themeMode } = useTheme();

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser.role !== 'admin') {
      navigate('/')
    }
  })


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users`
        );
        setUsersData(res?.data);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const uniqueUsersname = [...new Set(usersData.map((item) => item.username))];
  const uniqueEmail = [...new Set(usersData.map((item) => item.email))];


  const handleChange = (filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

 
  const columns = [
    {
      title: "Imagen de perfil",
      dataIndex: "profileImage",
      render: (image) => (
        <img
          src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${image}`}
          alt="Imagen de perfil"
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
      width: "30%",
    },
    {
      title: "Nombre",
      dataIndex: "username",
      filters: uniqueUsersname.map((username) => ({
        text: username,
        value: username,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.username.includes(value),
      width: "40%",
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: uniqueEmail.map((email) => ({
        text: email,
        value: email,
      })),
      filterSearch: true,
      onFilter: (value, record) => record.email.includes(value),
      width: "20%",
    },
    {
      title: "Creado",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString("es-ES"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (text, record) => (
        <Space size="middle">
          <DeleteUser userID={record._id} text="Eliminar" />
        </Space>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="grid place-content-center overflow-x-auto w-[80%] m-auto mb-[15rem] h-screen z-[-1000] lg:h-screen">
      <FadeAnimation className={"overflow-x-auto"}>
        <Space
          style={{
            marginBottom: 16,
            marginTop: 16,
          }}
        >
          <Link to="/dashboard">
            <Button className="ml-5" type={`${themeMode === "dark" ? "primary" : "default"}`}>
              Administrar Publicaciones
            </Button>
          </Link>
        </Space>

        <Table
          className={`${themeMode === "dark" ? "dark" : ""} table`}
          columns={columns}
          dataSource={usersData}
          loading={loading}
          onChange={handleChange}
          pagination={{ pageSize: 7 }}
          rowKey={(record) => record._id}
        />
      </FadeAnimation>
    </div>
  );
};

export default UsersManagement;
