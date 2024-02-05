import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../pages/Home/authSlice";

import "./header.scss";

const { VITE_APP_NAME } = import.meta.env;

const LoggedInView = () => {
  const loginState = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loginState) {
    return (
      <>
        <li className="nav-item">
          <Link to="/">Hello, {loginState || "user"}</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">user management</Link>
        </li>
        <li className="nav-item">
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
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
        <Col xs={{ span: 0 }} lg={{ span: 12 }}>
          <Link id="logo" to="/">
            {VITE_APP_NAME}
          </Link>
        </Col>

        <Col xs={{ span: 0 }} md={{ span: 14 }} lg={{ span: 12 }}>
          <nav className="justify-end">
            <ul className="ruRow nav-items">
              <LoggedInView />
            </ul>
          </nav>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
