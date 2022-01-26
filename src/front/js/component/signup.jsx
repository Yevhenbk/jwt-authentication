import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Context } from "../store/appContext.js";

import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals.scss";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const { register, handleSubmit } = useForm();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signup = (data) => {
    actions.signup(data);
  };

  return (
    <>
      <div className="myServiceButtonHolder">
        <input
          type="button"
          className="ff"
          value="Sign Up"
          onClick={handleShow}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <form action="" method="post" onSubmit={handleSubmit(signup)}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
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
                  placeholder="exmple@gmail.com"
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
            <input type="submit" value="Sign Up" className="signup-button" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Signup;
