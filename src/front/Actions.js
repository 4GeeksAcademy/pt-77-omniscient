export const signup = async (dispatch, payload) => {
  let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
  let data = await response.json();
};

export const login = async (dispatch, payload) => {
  let response = await fetch(import.meta.env.VITE_BACKEND_URL +"/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });
  let data = await response.json();

  dispatch({
    type: "set_user",
    payload: { user: data.user, access_token: data.access_token },
  });
};

export const getUser = async (dispatch, payload) => {
  let response = await fetch(import.meta.env.VITE_BACKEND_URL +"/private", {
    method: "Get",
    headers: { Authorization: "Bearer" + payload },
  });
  let data = await response.json();

  dispatch({
    type: "set_user",
    payload: { user: data.user, access_token: payload },
  });
};
export const getVintageGames = async (dispatch, payload) => {
  let response = await fetch(import.meta.env.VITE_BACKEND_URL+"/retrogames", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data = await response.json();

  dispatch({
    type: "add_vintageGames",
    payload: data,
  });
};
