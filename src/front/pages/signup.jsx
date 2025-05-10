import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
    const { store, dispatch, signup } = useGlobalReducer()
    const [user, setUser] = useState({ email: "", password: "" })
    const navigate = useNavigate();


    const handleSignup = () => {
        signup(user)
        navigate("/")
    }



    return (
        <div className="text-center mt-5">
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                </div>
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                </div>
            </div>
            <button className="btn btn-primary" onClick={() => handleSignup()}>Submit</button>
        </div>
    );
};


