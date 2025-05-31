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
  let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
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
  let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/profile", {
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
  let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/retrogames", {
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

export const getRawgGames = async (dispatch, payload) => {
  let response = await fetch(
    "https://api.rawg.io/api/games?key=e09cf7c5817241ee825687b3373f921f",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  let data = await response.json();

  dispatch({
    type: "add_RawgGames",
    payload: data,
  });
};

export const getGameDescription = async (slug) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${slug}?key=e09cf7c5817241ee825687b3373f921f`
  );
  const data = await response.json();
  return {
    slug: slug,
    name: data.name,
    description: data.description_raw || data.description,
  };
};

export const getUserById = async (dispatch, payload) => {
  console.log(localStorage.getItem("access_token"))
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/${payload}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  // if (!response.ok) throw new Error("User not found");

  const data = await response.json();

  dispatch({
    type: "set_user",
    payload: data,
  });
};

export const fetchUserInfo = async (dispatch, payload) => {
				try {
				  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
					headers: {
					  "Content-Type": "application/json",
					  Authorization: `Bearer ${localStorage.getItem("access_token")}`
					}
				  });
				  if (response.ok) {
					const data = await response.json();
					dispatch({
            type: "set_user",
            payload: data,
          });
				  } else {
					console.error("Failed to fetch user info", response.status);
				  }
				} catch (error) {
				  console.error("Error fetching user info", error);
				}
			  };