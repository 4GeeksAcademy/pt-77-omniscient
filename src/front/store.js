export const initialStore = () => {
  return {
    message: null,
    user: null,

    access_token: sessionStorage.getItem("access_token"),
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

      if (!store.user || store.access_token) {
        return {
          ...store,
          user: user,
          access_token: access_token,
        };
      }

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
      return {
        ...store,
        user: {
          ...store.user,
          about: action.payload,
        },
      };

    default:
      throw Error("Unknown action.");
  }
}
