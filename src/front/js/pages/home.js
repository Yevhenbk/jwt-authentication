import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

import Signup from "../component/signup.jsx";
import Login from "../component/login.jsx";
import { Navbar } from "../component/navbar.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="navbar-modal">
			<Login />
			<Signup />
		</div>
	);
};
