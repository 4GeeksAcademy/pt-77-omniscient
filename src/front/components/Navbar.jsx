import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "../SidebarData";
import '../navbar.css' 

export const Navbar = () => {
	const [sidebar, setsidbar] = useState(false)

	const showSideBar = () => {
		setsidbar(!sidebar);
	}
	return (
		<>
		
			<div className="navbar navbar-expand-lg container-fluid" >
				<div className="d-flex align-items-center">
					<Link to="#" className="menu-bars me-3" onClick={showSideBar}>
						<i className="fa-solid fa-bars"></i>
					</Link>
					 <span className="navbar-brand mb-0 h1">OMNISCIENT</span>

				</div>
				<div className="d-flex flex-grow-1 justify-content-center">
					<div className="wrap">
						<div className="search">
							<input type="text" className="searchTerm" placeholder="What are you looking for?" />
							<button type="submit" className="searchButton">
								<i className="fa fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="d-flex">
					<div className="ml-auto">
					<Link to="/signup" className="me-2">
						<button className="btn btn-primary">Sign Up</button>
					</Link>
					<Link to="/login" className="me-2">
						<button className="btn btn-primary">Log In</button>
					</Link>
				</div>
				</div>
			</div>
		


			<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
				<ul className="nav-menu-items" onClick={showSideBar}>
					<li className="navbar-toggle">
						<Link to="#" className="menu-bars" >
							<i className="fa-solid fa-xmark"></i>
						</Link>
					</li>
					{SidebarData.map((item, index) => {
						return (
							<li key={index} className={item.cName}>
								<Link to={item.path}>
									<i className={item.icon}></i>
									<span>{item.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>


			</nav>
			{sidebar && <div className="overlay" onClick={showSideBar}></div>}

		</>
	);
};