import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const App = () => (
  <Result
    status="500"
    title="500"
    subTitle="Disculpa las molestias, algo ha salido mal."
    extra={
      <Link to="/">
        <Button type="primary" className=" bg-dark-primary hover:bg-a-7">
          Volver al inicio
        </Button>
      </Link>
    }
  />
);
export default App;
