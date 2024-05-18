import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="">
      <div className="not-found-content">
        <Result
          status="404"
          title="404"
          subTitle="La página que estás buscando no se encontró."
          extra={
            <Link to="/">
              <Button type="primary" className=" bg-dark-primary hover:bg-a-7">Volver al inicio</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default Error404;
