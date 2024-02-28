import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import LayoutOne from "/src/components/LayoutOne";

const Loading = () => {
  //   console.log("I am spinning @", window.location.href);
  return (
    <LayoutOne>
      <div className="h-screen flex items-center justify-center -mt-32">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 52,
              }}
              spin
            />
          }
        />
      </div>
    </LayoutOne>
  );
};

export default Loading;
