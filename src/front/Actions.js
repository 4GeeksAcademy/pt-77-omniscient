export const signup = async (dispatch, payload) => {
  let response = await fetch( + "/signup", {
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
  let response = await fetch( + "/login", {
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
  let response = await fetch( + "/private", {
    method: "Get",
    headers: { "Authorization": "Bearer" + ppayload },
  }
  );
  let data = await response.json();

  dispatch({
    type: "set_user",
    payload: { user: data.user, access_token: payload },
  });
}


