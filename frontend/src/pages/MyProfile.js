import Card from "../components/Card";
import Input from "../components/Input";
import classes from "./MyProfile.module.css";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { updateUser } from "../store/userActions";
import { useState, useNavigate, useEffect } from "react";

const MyProfile = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const user = useSelector((state) => state.authen.login.currentUser);
  const id = user?.user.id;
  const accessToken = user?.accessToken;
  const userLogined = {
    mssv: user.user.mssv,
    name: user.user.name,
    phone: user.user.phone,
    email: user.user.email,
    cccd: user.user.cccd,
    gender: user.user.gender ? "Nam" : "Nữ",
    address: user.user.address,
    dob: user.user.dob,
  };
  useEffect(() => {
    setForm(userLogined);
  }, []);
  console.log(accessToken);
  const [form, setForm] = useState({});

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userUpd = {
      mssv: form.mssv,
      name: form.name,
      phone: form.phone,
      email: form.email,
      cccd: form.cccd,
      gender: form.gender,
      address: form.address,
      dob: form.dob,
    };
    const statuss = await updateUser(userUpd, id, dispatch, accessToken);
  };

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
          onChange={(event) => {
            onChange({ name: "mssv", value: event.target.value });
          }}
          value={form.mssv}
        />
        <Input
          label="Tên"
          type="text"
          name="mssv"
          id="mssv"
          onChange={(event) => {
            onChange({ name: "name", value: event.target.value });
          }}
          value={form.name}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="SĐT"
          type="text"
          name="sdt"
          id="sdt"
          onChange={(event) => {
            onChange({ name: "phone", value: event.target.value });
          }}
          value={form.phone}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          id="email"
          onChange={(event) => {
            onChange({ name: "email", value: event.target.value });
          }}
          value={form.email}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="CCCD"
          type="text"
          name="cccd"
          id="cccd"
          onChange={(event) => {
            onChange({ name: "cccd", value: event.target.value });
          }}
          value={form.cccd}
        />
        <Input
          label="Giới Tính"
          type="text"
          name="gender"
          id="gender"
          onChange={(event) => {
            onChange({
              name: "gender",
              value: event.target.value === "Nữ" ? false : true,
            });
          }}
          value={form.gender}
        />
      </div>
      <div className={classes.wrap}>
        <Input
          label="Địa Chỉ"
          type="text"
          name="address"
          id="address"
          onChange={(event) => {
            onChange({ name: "address", value: event.target.value });
          }}
          value={form.address}
        />
        <Input
          label="Ngày Sinh"
          type="text"
          name="dob"
          id="dob"
          onChange={(event) => {
            onChange({ name: "dob", value: event.target.value });
          }}
          value={form.dob}
        />
      </div>

      <div className={classes.wrap}>
        <Button onClick={onSubmit}>Cập Nhật</Button>
        <Button>Làm Mới</Button>
      </div>
    </Card>
  );
};

export default MyProfile;
