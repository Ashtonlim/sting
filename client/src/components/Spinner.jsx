import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => {
  return (
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
  );
};

export default Spinner;
