import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import projectimage1 from "../assets/img/projectimage1.png";
import { Carousel } from "../components/Carousel.jsx";

export const Home = () => {
  const { store, dispatch, getVintageGames } = useGlobalReducer();
  const [retroGames, setRetroGames] = useState([]);

  useEffect(() => {
    if (store.vintageGames.length == 0) {
      getVintageGames();
    }
  }, []);

  useEffect(() => {
    setRetroGames(store.vintageGames);
    // console.log(store.vintageGames)
  }, [store.vintageGames]);

	return (
		<div className="home"
						
			style={{
				backgroundImage: `url(${projectimage1})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "100vh", // full screen height
				width: "100vw",  // full screen width
			}}>
				<h1 className="text-white mx-auto text-center ">Welcome to Omniscient</h1>
			<div>
				<div class="button group">
				<div class="btn btn-danger">Enter as Guest</div>
				<div class="btn btn-danger">Log in/Sign up</div>
			</div>
			</div>
		</div>
	);
}; 