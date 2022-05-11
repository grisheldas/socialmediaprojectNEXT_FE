import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { API_URL } from "../../helpers";
import { toast } from "react-toastify";

export const loginAction = ({ username, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`http://localhost:5000/auth/login`, {
        username,
        email: username,
        password,
      });
      dispatch({ type: "LOGIN", payload: { ...res.data } });
      console.log(res.data, "ini res data login");
      Cookies.set("token", res.headers["x-token-access"]);
      toast.success("Login success", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(
        error.response.data.message || "Login failed, network error",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        }
      );
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const registerAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      console.log("redux");
      dispatch({ type: "LOADING" });
      let res1 = await axios.post(`http://localhost:5000/auth/register`, {
        ...values,
      });
      console.log(res1.data);

      dispatch({ type: "LOGIN", payload: res1.data });
      console.log(res1.data, "ini data");
      console.log(res1.headers, "ini headers");

      Cookies.set("token", res1.headers["x-token-access"]);
      toast.success(
        "Register success, please check your email to complete the process",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        }
      );
    } catch (error) {
      // error.res1.data.message ||
      toast.error(error.response.data.message || "Network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const updateProfileAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.patch(`${API_URL}/profilepicture`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("Profil updated!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};
