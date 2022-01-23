import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

import Signup from "./signup.jsx";
import Login from "./login.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//import { useForm } from "react-hook-form";
//import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

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
					<input type="button" onClick={actions.logOut} className="signup-button" value="Logout" />
				</div>
			)}
		</nav>
	);
};
