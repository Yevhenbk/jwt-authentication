import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { Context } from "../store/appContext.js";

import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import "../../styles/modals.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { store, actions } = useContext(Context);

  const getLogin = (data) => {
    let islogged = actions.login(data);
    console.log(islogged);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="myServiceButtonHolder">
        <input
          type="button"
          className="ff"
          value="Login"
          onClick={handleShow}
        />
      </div>

      <Modal show={show} onHide={handleClose} className="modal show">
        <form action="" method="post" onSubmit={handleSubmit(getLogin)}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
            <CloseButton onClick={handleClose} />
          </Modal.Header>

          <Modal.Body>
            <div>
              <div className="inputs-holder">
                <label htmlFor="email" className="labels-ls">
                  Email:
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="inputs-ls"
                  placeholder="example@gmail.com"
                  {...register("email")}
                />

                <label htmlFor="pwd" className="labels-ls">
                  Password:
                </label>

                <input
                  type="password"
                  id="pwd"
                  name="pwd"
                  className="inputs-ls"
                  placeholder="********"
                  {...register("password")}
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <input
              type="submit"
              value="Login"
              className="signup-button"
              onClick={handleClose}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Login;
