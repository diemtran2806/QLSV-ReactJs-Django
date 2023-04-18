import axios from "axios";
import { setUser } from "./userSlice";

export const updateUser = async (user, id, dispatch, accessToken) => {
  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api/users/${id}/update/`,
      user,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(setUser(res.data));
    //navigate("/");
  } catch (err) {
    return err.response.status;
  }
};
