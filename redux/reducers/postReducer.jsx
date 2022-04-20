const INITIAL_STATE = {
  post: {},
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return { ...state, ...action.payload };
    case "FETCH_POST":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default postReducer;
