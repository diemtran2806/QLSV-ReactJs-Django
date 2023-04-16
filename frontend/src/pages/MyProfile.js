import Card from "../components/Card";
import Input from "../components/Input";
import classes from "./MyProfile.module.css";
const MyProfile = () => {
  return (
    <Card header="Thông Tin Cá Nhân">
      <div className={classes.wrap}>
        <Input
          label="Mã Số Sinh Viên"
          type="text"
          name="mssv"
          id="mssv"
          // placeholder="Nhập tên tài khoản"
          value="hehe"
        />
        <Input
          label="Mã Số Sinh Viên"
          type="text"
          name="mssv"
          id="mssv"
          // placeholder="Nhập tên tài khoản"
          value="hehe"
        />
      </div>
      <Input
        label="Mã Số Sinh Viên"
        type="text"
        name="mssv"
        id="mssv"
        // placeholder="Nhập tên tài khoản"
        value="hehe"
      />
    </Card>
  );
};

export default MyProfile;
