import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { ProjectOutlined } from "@ant-design/icons";

import LayoutOne from "/src/components/LayoutOne";

import * as dayjs from "dayjs";
dayjs().format();

const Home = () => {
  const [appData, setappData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/apt/allApps");
      console.log(data);
      setappData(data);
    };
    init();
  }, []);

  return (
    <LayoutOne>
      <Link to="/create-application">
        <Button type="primary" className="mb-5 float-right">
          Create Application
        </Button>
      </Link>

      {appData.length > 0 ? (
        <Table rowKey="App_Acronym" columns={columns} dataSource={appData} />
      ) : (
        <h3>
          No Applications to view, create one{" "}
          <Link className="underline" to="/create-application">
            here
          </Link>
          .
        </h3>
      )}
    </LayoutOne>
  );
};

export default Home;

const columns = [
  {
    title: "App Acronym (View Kanban)",
    dataIndex: "App_Acronym",
    key: "App_Acronym",
    render: (text) => (
      <Link to={`/kanban/${text.toLowerCase()}`}>
        {text} <ProjectOutlined />
      </Link>
    ),
  },
  {
    title: "Start Date",
    dataIndex: "App_startDate",
    key: "App_startDate",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "End Date",
    dataIndex: "App_endDate",
    key: "App_endDate",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "Edit",
    dataIndex: "operation",
    key: "operation",
    render: (_, record) => (
      <Link to={`/edit-application/${record.App_Acronym}`}>
        <Button>View / Edit</Button>
      </Link>
    ),
  },
];
