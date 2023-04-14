import Card from "../components/Card";
import { useState } from "react";
const LoginPage = () => {
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

  const onSubmit = () => {
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
      // register(form)(authDispatch)((response) => {
      //   navigate(LOGIN, {data: response});
      // });
      // const newForm = {
      //   email: email,
      //   username: form.username,
      //   password: form.password,
      // };
      // register(newForm)(authDispatch);
      // navigation.navigate('Login');
    }
  };

  return (
    <Card onSubmit={onSubmit} onChange={onChange} form={form} errors={errors} />
  );
};

export default LoginPage;
