
import { Spin } from 'antd';
import style from "./style.module.css";

function Loading() {
  return(
    <div className={style.loadingContainer}>
            <Spin tip="Loading" size="large"></Spin>
    </div>
  )
}

export default Loading;
