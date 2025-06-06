export const initialStore = () => {
  const access_token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    message: null,
    user: user || null,
    access_token: access_token || null,
    vintageGames: [],
    rawgGames: [],
    save_for_later: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_user":
      const { user, access_token } = action.payload;
      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        ...store,
        user,
        access_token,
      };

    case "add_vintageGames":
      return {
        ...store,
        vintageGames: action.payload,
      };

    case "add_RawgGames":
      return {
        ...store,
        rawgGames: action.payload,
      };

    case "save_for_later":
      return {
        ...store,
        save_for_later: [...store.save_for_later, action.payload],
      };

    case "update_about":
      const updatedUser = { ...store.user, about: action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...store,
        user: updatedUser,
      };

    case "logout":
      return {
        ...store,
        user: null,
        access_token: null,
      };

    default:
      console.error("Unknown action type:", action.type);
      return store;
  }
}
