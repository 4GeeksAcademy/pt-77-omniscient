import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { store, dispatch, login } = useGlobalReducer();
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    login(user);
    navigate("/profile");
  };

  return (
    <div className="text-center mt-5">
      <div className="input-group mb-3  w-50 mx-auto">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          aria-label="email"
          aria-describedby="basic-addon1"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>
      <div className="input-group mb-3  w-50 mx-auto">
        <input
          type="password"
          className="form-control"
          placeholder="****"
          aria-label="psw"
          aria-describedby="basic-addon1"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
      </div>

      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => handleLogin()}>
          Submit
        </button>
      </div>
    </div>
  );
};