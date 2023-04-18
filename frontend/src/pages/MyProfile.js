import Card from "../components/Card";
import Input from "../components/Input";
import classes from "./MyProfile.module.css";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <Card header="Thông Tin Cá Nhân">
      <div style={{ textAlign: "center" }}>
        <Avatar />
      </div>
      <div className={classes.wrap}>
        <Input
          label="Mã Số Sinh Viên"
          type="text"
          name="mssv"
          id="mssv"
          // placeholder="Nhập tên tài khoản"
          value={user.user.username}
        />
        <Input
          label="Tên"
          type="text"
          name="mssv"
          id="mssv"
          // placeholder="Nhập tên tài khoản"
          value={user.user.name}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="SĐT"
          type="text"
          name="sdt"
          id="sdt"
          // placeholder="Nhập tên tài khoản"
          value={user.user.phone}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          id="email"
          // placeholder="Nhập tên tài khoản"
          value={user.user.email}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="CCCD"
          type="text"
          name="cccd"
          id="cccd"
          // placeholder="Nhập tên tài khoản"
          value={user.user.cccd}
        />
        <Input
          label="Giới Tính"
          type="text"
          name="gender"
          id="gender"
          // placeholder="Nhập tên tài khoản"
          value={user.user.gender ? "Nam" : "Nữ"}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="Địa Chỉ"
          type="text"
          name="address"
          id="address"
          // placeholder="Nhập tên tài khoản"
          value={user.user.address}
        />
        <Input
          label="Ngày Sinh"
          type="text"
          name="date"
          id="date"
          // placeholder="Nhập tên tài khoản"
          value={user.user.gender ? "Nam" : "Nữ"}
        />
      </div>
    </Card>
  );
};

export default MyProfile;
