import axios from "axios";
import { setUser, updatePassword } from "./userSlice";

export const updateUser = async (user, id, dispatch, accessToken, navigate) => {
  console.log("user o tren:", user);
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/users/${id}/update/`,
      user,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("user update action:", res.data);
    dispatch(setUser(res.data));
    // navigate("/");
  } catch (err) {
    // console.log("error", err.response);
    return err.response.status;
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
      `http://127.0.0.1:8000/api/users/${id}/change-password/`,
      newPass,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res.data);
    //dispatch(updatePassword(res.data));
    navigate("/");
  } catch (err) {
    console.log(err);
    return err.response.status;
  }
};
