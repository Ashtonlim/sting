import { Fragment } from "react";
import { Row, Col } from "antd";

import Header from "./Header";
import Footer from "./Footer";

const LayoutOne = ({ children, width = 22 } = {}) => (
  <>
    <Header />
    <div id="mainContent">
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: width }}>
          <main>
            <Fragment>{children}</Fragment>
          </main>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 0 }}></Col>
        <Col xs={{ span: 0 }} md={{ span: 24 }}>
          <Footer />
        </Col>
      </Row>
    </div>
  </>
);

export default LayoutOne;
