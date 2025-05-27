export const initialStore = () => {
  return {
    message: null,
    user: null,

    access_token: sessionStorage.getItem("access_token"),
    vintageGames: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_user":
      const { user, access_token } = action.payload;
      sessionStorage.setItem("access_token", access_token);

      return {
        ...store,
        user: user,
        access_token: access_token,
      };

    case "add_vintageGames":
      return {
        ...store,
        vintageGames: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
