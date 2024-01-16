import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./footer.scss";

const { VITE_APP_NAME } = import.meta.env;

function Footer() {
  return (
    <footer className="site-footer">
      <Row
        style={{ width: "100%", padding: "0px 20px" }}
        justify="center"
        align="middle"
      >
        <Col xs={{ span: 24 }} md={{ span: 4 }}>
          <Link to="/">{VITE_APP_NAME}</Link>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 20 }}>
          <span className="copyright-text">
            Copyright &copy; All Rights Reserved by
            <a href="/"> {VITE_APP_NAME}</a>
          </span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
