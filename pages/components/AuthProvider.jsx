import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosInstance } from "../../helpers";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    try {
      let token = Cookies.get("token");
      if (token) {
        let res = await AxiosInstance.get(`/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "LOGIN", payload: res.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <img
            className="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt=""
          />
        </div>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
