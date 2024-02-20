// import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import Cookies from "js-cookie";

import GC from "/src/context";
import "./header.scss";

const { VITE_APP_NAME } = import.meta.env;

const LoggedInView = () => {
  const { state, dispatch } = useContext(GC);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("from headers", state);
  }, [state.loggedIn]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (state.loggedIn) {
    return (
      <>
        {state.isAdmin && (
          <li className="nav-item">
            <Link to="/dashboard">User management</Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          {/* Review: navigate() doesnt not work w Link onClick, why? */}
          <a onClick={handleLogout}>Logout</a>
        </li>
      </>
    );
  }
};

const Header = () => {
  return (
    <header className="App-header bg-white shadow-[rgba(13,_38,_76,_0.11)_0px_5px_20px]">
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
