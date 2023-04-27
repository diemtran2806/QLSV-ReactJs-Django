import Card from "../components/Card";
import Input from "../components/Input";
import classes from "./MyProfile.module.css";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { updateUser } from "../store/userActions";
import { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import defaultAvatar from "../assets/images/defaultAvatar.jpg";
import { useNavigation } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  console.log("Chạy lại ne");
  const user = useSelector((state) => state.auth.login.currentUser);
  const userAfterUpdate = useSelector((state) => state.user.userUpdate);
  console.log("userUpdated", userAfterUpdate);
  console.log("userrr", user);
  const id = user?.user.id;
  const accessToken = user?.accessToken;

  const [form, setForm] = useState({
    id: userAfterUpdate?.id || "",
    mssv: userAfterUpdate.mssv || "",
    name: userAfterUpdate.name || "",
    phone: userAfterUpdate.phone || "",
    email: userAfterUpdate.email || "",
    cccd: userAfterUpdate.cccd || "",
    gender: userAfterUpdate.gender ? "Nam" : "Nữ" || "",
    address: userAfterUpdate.address || "",
    dob: userAfterUpdate.dob || "",
    avatar: userAfterUpdate.avatar || "",
  });
  // const userLogined = {
  //   id,
  //   mssv,
  //   name,
  //   phone,
  //   email,
  //   cccd,
  //   gender,
  //   address,
  //   dob,
  // };
  // useEffect(() => {
  //   setForm(userAfterUpdate);
  // }, [userAfterUpdate]);
  console.log(accessToken);

  const handleChangeAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageSrc = reader.result;
        const formData = new FormData();
        formData.append("image", imageSrc.split(",")[1]);
        fetch(
          `${"https://api.imgbb.com/1/upload"}?key=${"592e68d61b4d1cb73e4970986bdc3a8f"}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data.url);
            setForm({ ...form, ["avatar"]: data.data.url });
          });
      });
      // console.log("form:", form.avatar);

      reader.readAsDataURL(file);
    }
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const onChangeDate = (date, dateString) => {
    console.log(dateString);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const userUpd = {
      id: form.id,
      mssv: form.mssv,
      name: form.name,
      phone: form.phone,
      email: form.email,
      cccd: form.cccd,
      gender: form.gender === "Nữ" ? false : true,
      address: form.address,
      dob: form.dob,
      id_role: 1,
      avatar: form.avatar,
    };
    const statuss = await updateUser(
      userUpd,
      id,
      dispatch,
      accessToken,
      navigate
    );
    setForm(userUpd);
    console.log("form ne:", form);
    console.log("Statuss:", statuss);
  };

  return (
    <Card header="Thông Tin Cá Nhân">
      <div className={classes.wrapAvatar}>
        {/* <Avatar /> */}
        <label for="file-input" className={classes.avatarWrapper}>
          {form.avatar ? (
            <img className={classes.avatar} src={form.avatar} alt="Avatar" />
          ) : (
            <img className={classes.avatar} src={defaultAvatar} alt="Avatar" />
          )}
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleChangeAvatar}
          />
        </label>
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
        <div className={classes.distance}></div>
        <Input
          label="Tên"
          type="text"
          name="name"
          id="name"
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
        <div className={classes.distance}></div>
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
        <div className={classes.distance}></div>
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
        <div className={classes.distance}></div>
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
        {/* <div className={classes.wrapperInput}>
          <label className={classes.label}>Ngày Sinh</label>
          <Space direction="vertical">
            <DatePicker
              onChange={onChangeDate}
              className={classes.date}
              value={moment("2022-06-12")}
            />
          </Space>
        </div> */}
      </div>
      <div className={classes.wrap}>
        <Button onClick={onSubmit}>Cập Nhật</Button>
        <Button type="Reset">Làm Mới</Button>
      </div>
    </Card>
  );
};

export default MyProfile;
