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
				<h1 className="text-white mx-auto text-center p-5">Welcome to Omniscient</h1>
			<div>
				<div class="button group  mx-auto text-center d-flex justify-content-center gap-5">
				<div class="btn btn-danger">Enter as Guest</div>
				<div class="btn btn-danger ">Log in/Sign up</div>
			</div>
			</div>
		</div>
	);
}; 