import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "/src/pages/Login/authSlice.js";
import "./header.scss";

const { VITE_APP_NAME } = import.meta.env;

const LoggedInView = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {
    dispatch(logout());
  };
  // console.log("from header isadmin", state, state.isAdmin);
  if (user.loggedIn) {
    return (
      <>
        {user.isAdmin && (
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
