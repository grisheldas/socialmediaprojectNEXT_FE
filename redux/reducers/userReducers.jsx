const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  username: "",
  error_msg: "",
  email: "",
  profilepicture: "",
  bio: "",
  fullname: "",
  isVerified: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_msg: "", ...action.payload };
    case "ERROR":
      return { error_msg: action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
