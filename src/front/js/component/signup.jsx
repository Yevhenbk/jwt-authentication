import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Context } from "../store/appContext.js";

import Modal from "react-bootstrap/Modal";
import "../../styles/modals.scss";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const { register, handleSubmit } = useForm();

  const signup = (data) => {
    actions.signup(data);
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit(signup)}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="inputs-holder">
              <label htmlFor="email" className="labels-ls">
                Correo electronico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="inputs-ls"
                {...register("email")}
              />
              <label htmlFor="pwd" className="labels-ls">
                Contraseña:
              </label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                className="inputs-ls"
                {...register("password")}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <input type="submit" value="Signup" className="signup-button" />
        </Modal.Footer>
      </Modal.Dialog>
    </form>
  );
};

export default Signup;
