import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Profile = () => {
    const { theId } = useParams();
    const { store, getUserById } = useGlobalReducer()
    const [message, setMessage] = useState("")
   
 
    useEffect(() => {
        if (theId) {
            getUserById(theId);
        }
    }, [theId]);

    useEffect(() => {
        if (store.user == null) {
            setMessage("User not found or not logged in.");
        } else {
            setMessage(`Hello ${store.user.email}`);
        }
    }, [store.user]);

    return (
        <div className="text-center mt-5">
            <h1>{message}</h1>
            <p>User ID from URL: {theId}</p>
        </div>
    );
};