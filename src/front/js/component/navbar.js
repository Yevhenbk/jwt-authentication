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
	const [show, setShow] = useState(false);
	const [logged, setLogged] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
		<nav className="navbar fixed-top" collapseOnSelect expand="lg">
			{/* <Link to="/">
				<img className="navbar-brand " src={LogoPositivo} />
			</Link> */}

			{!store.islogged ? (
				<div className="navbar">
					<div className="navbar-modal">
						<Login />
						<Signup />
					</div>
				</div>
			) : (
				<div>
					<input type="button" onClick={actions.logOut} className="signup-buttom" />
				</div>
			)}
		</nav>
	);
};
