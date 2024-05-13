import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const updateUserToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  const baseURL = BASE_URL;

  try {
    const res = await axios.post(baseURL + "token/refresh-token/", {
      refresh: refreshToken,
    });
    if (res.status === 200) {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      let decoded = jwtDecode(res.data.access);
      if (!decoded.user_role === 'CLIENT') {
        throw "not a client"
      }
      return {
        status: 'success',
        access: res.data.access,
        refresh: res.data.refresh
      };
    } else {
      return { status: 'failed', reason: "Not a client" };
    }
  } catch (error) {
    console.log(error);
    return { status: 'failed', reason: error.message };
  }
};

const tokenValidate = async () => {
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    return false
  }
  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);
  if (decoded.exp > currentTime) {
    return true;
  } else {
    const result = await updateUserToken();
    if (result.status === 'success') {
      return true
    } else if (result.status === 'failed') {
      return false
    }
  }
};
export default tokenValidate;