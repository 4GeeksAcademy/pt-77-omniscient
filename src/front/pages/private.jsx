import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Private = () => {
    const { store, dispatch, getUser } = useGlobalReducer()
    const [message, setMessage] = useState("")
    useEffect(() => {
        getUser(store.access_token)
    }, [])

    useEffect(() => {
        if (store.user == null) {
            setMessage("Gotta Login First")
        }
        else {
            setMessage(`Hello ${store.user.email}`)
        }
    }, [store.user])
    return (
        <div className="text-center mt-5">
            {message}
        </div>
    );
}; 