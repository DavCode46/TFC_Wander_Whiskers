import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

import { Link } from "react-router-dom";

import DeletePost from "./DeletePost";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/posts`
        );
        setPostData(res?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const uniqueTitles = [...new Set(postData.map((item) => item.title))];
  const uniqueConditions = [...new Set(postData.map((item) => item.condition))];
  const uniqueLocations = [...new Set(postData.map((item) => item.location))];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };
  

  const columns = [
    {
      title: "Imagen",
      dataIndex: "image",
      render: (image) => (
        <img
          src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${image}`}
          alt="Imagen"
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
      width: "30%",
    },
    {
      title: "Título",
      dataIndex: "title",
      filters: uniqueTitles.map((title) => ({
        text: title,
        value: title,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.title === value,
      width: "20%",
      render: (text) => truncateText(text, 25),
    },
    {
      title: "Descripción",
      dataIndex: "content",
      width: "20%",
      render: (text) => truncateText(text, 50),
    },
    {
      title: "Localización",
      dataIndex: "location",
      filters: uniqueLocations.map((location) => ({
        text: location,
        value: location,
      })),
      onFilter: (value, record) => record.location == value,
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Condición",
      dataIndex: "condition",
      filters: uniqueConditions.map((condition) => ({
        text: condition,
        value: condition,
      })),
      onFilter: (value, record) => record.condition === value,
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/post/${record._id}/detail`}>
            <Button type='dashed' icon={<EyeOutlined />}>Ver</Button>
          </Link>
          <Link to={`/posts/${record._id}/edit`}>
            <Button  icon={<EditOutlined />} className="">
              Editar
            </Button>
          </Link>
          <DeletePost postID={record._id} />
        </Space>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="grid items-center justify-center overflow-x-auto w-[80%] m-auto mb-[10rem] z-[-1000]">
      <Space
        style={{
          marginBottom: 16,
          marginTop: 90,
        }}
      >
        <Button onClick={clearFilters}>Eliminar filtros</Button>
        <Link to="/dashboard/users">
          <Button>Administrar usuarios</Button>
        </Link>
      </Space>
      <Table
        columns={columns}
        dataSource={postData}
        loading={loading}
        onChange={handleChange}
        pagination={{ pageSize: 10 }}
        className="table"
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default Dashboard;
