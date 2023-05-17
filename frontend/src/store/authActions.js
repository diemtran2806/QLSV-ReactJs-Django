import axios from "axios";

import {
  loginStart,
  loginSuccess,
  loginFalse,
  logoutStart,
  logoutSuccess,
  logoutFalse,
  setPasswordUpdated,
  setUserUpdated,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/users/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFalse());
    return err.response.status;
  }
};

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("http://127.0.0.1:8000/api/users/logout", {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch(logoutFalse());
  }
};

export const changePassword = async (
  newPass,
  id,
  dispatch,
  accessToken,
  navigate
) => {
  console.log(newPass);
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/users/${id}/change-password`,
      newPass,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data);
    dispatch(setPasswordUpdated(res.data));
    navigate("/");
  } catch (err) {
    console.log(err);
    return err.response.status;
  }
};

export const updateUser = async (user, id, dispatch, accessToken, navigate) => {
  console.log("user o tren:", user);
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/users/${id}/update`,
      user,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("user update action:", res.data);
    dispatch(setUserUpdated(res.data));
    // navigate("/");
  } catch (err) {
    // console.log("error", err.response);
    return err.response.status;
  }
};
