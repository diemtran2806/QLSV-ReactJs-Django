import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFalse,
  logoutStart,
  logoutSuccess,
  logoutFalse,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/users/login/",
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
    await axiosJWT.post("http://127.0.0.1:8000/api/users/logout/", {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch(logoutFalse());
  }
};
