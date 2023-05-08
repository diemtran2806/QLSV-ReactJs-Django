// import { Spin } from 'antd';
// import style from "./style.module.css";

// function Loading() {
//   return(
//     <div className={style.loadingContainer}>
//             <Spin tip="Loading" size="large"></Spin>
//     </div>
//   )
// }

import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    // <Space direction="vertical">
    <div className={classes.wrapIcon}>
      <Button icon={<PoweroffOutlined />} loading className={classes.icon} />
    </div>
    // </Space>
  );
};
export default Loading;
