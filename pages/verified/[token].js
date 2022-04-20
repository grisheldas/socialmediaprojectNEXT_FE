import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_URL } from "../../helpers";

const Verified = () => {
  const router = useRouter();
  const { token } = router.query;

  const [condition, setCondition] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isLogin, username, id, email } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      let res = await axios.get(`${API_URL}/auth/verified`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "LOGIN", payload: res.data });
      console.log(API_URL);
      setCondition(1);
    } catch (error) {
      console.log(error);
      setCondition(2);
    } finally {
      setLoading(false);
    }
  }, []);
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/sendemail-verified`, {
        id: id,
        username,
        email,
      });
      toast.success("Verification e-mail sent", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send verification e-mail", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-cyan-700">
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

  if (condition === 1) {
    router.push("/profile");
  }

  if (condition === 2) {
    return (
      <div className=" min-h-screen bg-cyan-900 items-center text-center">
        <div className="font-bold text-2xl py-7 text-slate-100">
          Failed to verify your account.
        </div>
        <div>
          {/* {kalo belum login jangan sediakan button} */}
          {isLogin ? (
            <button
              className=" bg-slate-300 p-3 mt-5 text-center rounded-lg font-semibold cursor-pointer hover:bg-slate-400"
              onClick={sendEmail}
            >
              Resend verification link
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Verified;
