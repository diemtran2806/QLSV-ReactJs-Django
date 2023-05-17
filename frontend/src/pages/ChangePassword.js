import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import classes from "./Login.module.css";
import { changePassword } from "../store/authActions";

const ChangePassword = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?.user.id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [pass, setPass] = useState();

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== "") {
      if (name === "newpass") {
        if (value.length < 6) {
          setErrors((prev) => {
            return {
              ...prev,
              [name]: "Password need min 6 characters!",
            };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: null };
          });
          setPass(value);
        }
      }
      if (name === "retypepass") {
        if (value !== pass) {
          setErrors((prev) => {
            return {
              ...prev,
              [name]: "Password does not match, please try again!",
            };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: null };
          });
        }
      }
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This field is required!" };
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.newpass) {
      setErrors((prev) => {
        return { ...prev, mssv: "Please add a password!" };
      });
    }
    if (!form.retypepass) {
      setErrors((prev) => {
        return { ...prev, password: "Please add a retype password!" };
      });
    }

    if (
      Object.values(form).length === 2 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      const newPassword = {
        password: form.newpass,
      };
      // const newPassword = form.newpass;
      // console.log("login ne");
      const statuss = await changePassword(
        newPassword,
        id,
        dispatch,
        accessToken,
        navigate
      );
    }
  };

  return (
    <Card header="Đổi Mật Khẩu">
      <Input
        label="Nhập mật khẩu mới"
        type="password"
        name="newpass"
        id="newpass"
        onChange={(event) => {
          onChange({ name: "newpass", value: event.target.value });
        }}
        error={errors.newpass}
      />
      <Input
        label="Nhập lại mật khẩu"
        type="password"
        name="retypepass"
        id="retypepass"
        onChange={(event) => {
          onChange({ name: "retypepass", value: event.target.value });
        }}
        error={errors.retypepass}
      />
      <div className={classes.wrap}>
        <Button onClick={onSubmit}>Cập Nhật</Button>
        <Button type="Reset">Làm Mới</Button>
      </div>
    </Card>
  );
};

export default ChangePassword;
