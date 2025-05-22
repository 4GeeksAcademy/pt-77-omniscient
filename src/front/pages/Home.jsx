import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import projectimage1 from "../assets/img/projectimage1.png";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()


	return (
		<div className="home"

			style={{
				backgroundImage: `url(${projectimage1})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "100vh", // full screen height
				width: "100vw",  // full screen width
			}}>

			<div>
				<div class="button group">


				</div>
			</div>
		</div>
	);
}; 