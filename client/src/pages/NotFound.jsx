import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <Result
          status="404"
          title="404"
          subTitle="La página que estás buscando no se encontró."
          extra={
            <Link to="/">
              <Button type="primary" className=" bg-blue-400">Volver al inicio</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
