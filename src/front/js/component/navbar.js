import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

import Signup from "./signup.jsx";
import Login from "./login.jsx";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

//import { useForm } from "react-hook-form";
//import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			actions.setLoggedIn();
		} else {
			actions.setLoggedOut();
		}
		function checkUserData() {
			const token = localStorage.getItem("token");
			console.log("hello");

			if (token) {
				actions.setLoggedIn();
			} else {
				actions.setLoggedOut();
			}
		}

		window.addEventListener("storage", checkUserData);

		return () => {
			window.removeEventListener("storage", checkUserData);
		};
	}, []);

	return (
		<nav className="navbar-fixed-top">
			{/* <Link to="/">
				<img className="navbar-brand " src={LogoPositivo} />
			</Link> */}

			{!store.islogged ? (
				<div className="ls-navbar">
					<div className="navbar-modal">
						<Login />
						<Signup />
					</div>
				</div>
			) : (
				<div className="navbar-modal">
					<input type="button" onClick={actions.logOut} className="ff" value="Logout" />
				</div>
			)}
		</nav>
	);
};
