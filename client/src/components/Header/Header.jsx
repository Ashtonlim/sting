import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import "./header.scss";

const { VITE_APP_NAME } = import.meta.env;

const LoggedInView = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <>
        <li className="nav-item">
          <Link to="/logout">Logout</Link>
        </li>
      </>
    );
  }
};

const Header = () => {
  return (
    <header className="App-header bg-white">
      <Row
        style={{ width: "100%", padding: "0px 20px" }}
        justify="center"
        align="middle"
      >
        <Col xs={{ span: 0 }} lg={{ span: 20 }}>
          <Link id="logo" to="/">
            {VITE_APP_NAME}
          </Link>
        </Col>

        <Col xs={{ span: 0 }} md={{ span: 14 }} lg={{ span: 4 }}>
          <nav className="justify-end">
            <ul className="ruRow nav-items">
              <LoggedInView loggedIn={false} />
            </ul>
          </nav>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
