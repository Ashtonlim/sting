import { useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

import LayoutOne from "/src/components/LayoutOne";
const columns = [
  {
    title: "Acronym",
    dataIndex: "App_Acronym",
    key: "App_Acronym",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Start Date",
    dataIndex: "App_startDate",
    key: "App_startDate",
  },
  {
    title: "End Date",
    dataIndex: "App_endDate",
    key: "App_endDate",
  },
];
const data = [
  {
    key: "1",
    App_Acronym: "app1",
    App_startDate: 32,
    App_endDate: "New York No. 1 Lake Park",
  },
];

const Home = () => {
  useEffect(() => {});
  return (
    <LayoutOne>
      <Button type="primary">
        <Link href="/create-application">Create Application</Link>
      </Button>
      <Table columns={columns} dataSource={data} />
    </LayoutOne>
  );
};

export default Home;
