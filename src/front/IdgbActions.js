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
