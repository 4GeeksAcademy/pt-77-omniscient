import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
  const { store, dispatch, signup } = useGlobalReducer();
  const [user, setUser] = useState({email:"", password: ""});
  const navigate = useNavigate ();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup(user);
    navigate("/");
  };

  return (
    <div className="text-center mt-5">
      <div className="input-group mb-3 w-50 mx-auto">
        <input
         onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          type="email"
          className="form-control"
          placeholder="Email"
          aria-label="email"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3 w-50 mx-auto">
        <input
         onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          type="password"
          className="form-control"
          placeholder="****"
          aria-label="psw"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={(e) => handleSignUp(e)}>Submit</button>
      </div>
    </div>
  );
};