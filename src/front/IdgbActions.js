export const getVintageGames = async (dispatch, payload) => {
    let response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": "2r3wcled8ugszufen3r4r2makgitqq",
            "Authorization": "Bearer x3du3wpyr1fvn0jmmrtyzsq6sek9w0",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    let data = await response.json();

    dispatch({
        type: "add_vintageGames",
        payload: data.results,
    });
};