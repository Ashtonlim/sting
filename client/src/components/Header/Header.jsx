import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Cookie from "js-cookie";

import { isLoggedIn } from "/src/utils/auth";
import { useNavigate } from "react-router-dom";

import "./header.scss";

const { VITE_APP_NAME } = import.meta.env;

const LoggedInView = () => {
  const nav = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    setloggedIn(isLoggedIn());
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    const res = Cookie.remove("jwt");
    nav("/login");
    return res;
  };

  if (loggedIn) {
    return (
      <>
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
        <Col xs={{ span: 0 }} lg={{ span: 20 }}>
          <Link id="logo" to="/">
            {VITE_APP_NAME}
          </Link>
        </Col>

        <Col xs={{ span: 0 }} md={{ span: 14 }} lg={{ span: 4 }}>
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
