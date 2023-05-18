import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authActions";
import Card from "../components/Card";
import Input from "../components/Input";
import classes from "./Login.module.css";
import Button from "../components/Button";
import { BiShow } from "react-icons/bi";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const [form, setForm] = useState({});

  const [showPass, setShowPass] = useState(false);
  const [textShowHide, setTextShowHide] = useState("Show Password");
  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== "") {
      if (name === "password") {
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
        }
      }
      if (name === "mssv") {
        setErrors((prev) => {
          return { ...prev, [name]: null };
        });
      }
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This field is required!" };
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.mssv) {
      setErrors((prev) => {
        return { ...prev, mssv: "Please add a username!" };
      });
    }
    if (!form.password) {
      setErrors((prev) => {
        return { ...prev, password: "Please add a password!" };
      });
    }

    if (
      Object.values(form).length === 2 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      const user = {
        mssv: form.mssv,
        password: form.password,
      };
      console.log("login ne");
      const statuss = await loginUser(user, dispatch, navigate);
      if (statuss === 401)
        setErrorLogin(
          "The login details you provided are incorrect. Please try again!"
        );
      localStorage.setItem("logined", "false");
      console.log("này ở login:", localStorage.getItem("logined"));
    }
  };

  const showHidePassHandler = () => {
    setShowPass((prev) => !prev);
    if (showPass) {
      setTextShowHide("Show Password");
    } else setTextShowHide("Hide Password");
  };

  return (
    <Card header="Đăng nhập">
      <Input
        label="Tài khoản"
        type="text"
        name="username"
        id="username"
        placeholder="Nhập tên tài khoản"
        onChange={(event) => {
          onChange({ name: "mssv", value: event.target.value });
        }}
        error={errors.mssv}
      />
      <Input
        label="Mật khẩu"
        type={showPass ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Nhập mật khẩu"
        onChange={(event) => {
          onChange({ name: "password", value: event.target.value });
        }}
        icon={<BiShow />}
        error={errors.password}
      />
      
      <div className={classes.showHidePass} onClick={showHidePassHandler}>
        {textShowHide}
      </div>
      {errorLogin && <div className={classes.errorLogin}>{errorLogin}</div>}
      <div className={classes.wrapperBtn}>
        <Button onClick={onSubmit}>Đăng nhập</Button>
        <Button type="reset">Nhập lại</Button>
      </div>
    </Card>
  );
};

export default LoginPage;
