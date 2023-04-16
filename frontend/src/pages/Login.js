import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authActions";
import Card from "../components/Card";
import Input from "../components/Input";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

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
      if (name === "username") {
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
    if (!form.username) {
      setErrors((prev) => {
        return { ...prev, username: "Please add a username!" };
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
        username: form.username,
        password: form.password,
      };
      const statuss = await loginUser(user, dispatch, navigate);
      // if(statuss === 401)
      //showError("THE LOGIN DETAILS YOU PROVIDED ARE INCORRECT. PLEASE TRY AGAIN.");
    }
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
          onChange({ name: "username", value: event.target.value });
        }}
        error={errors.username}
      />
      <Input
        label="Mật khẩu"
        type="password"
        name="password"
        id="password"
        placeholder="Nhập mật khẩu"
        onChange={(event) => {
          onChange({ name: "password", value: event.target.value });
        }}
        error={errors.password}
      />
      <button>Login</button>
    </Card>
  );
};

export default LoginPage;
