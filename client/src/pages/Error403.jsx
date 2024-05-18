import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const Error403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="Disculpa las molestias, no estás autorizado para ver esta página."
    extra={
      <Link to="/">
        <Button type="primary" className=" bg-dark-primary hover:bg-a-7">
          Volver al inicio
        </Button>
      </Link>
    }
  />
);
export default Error403;
