import React from "react"
import {useAuth} from "../contexts/AuthContext"
const Home = () => {
    const {currentUser, loading} = useAuth()

    return loading ? (
        <p>loading...</p>
    ) : (
        <div>
            <p>this is my home component</p>
            <p>
                you are logged in as <strong>{currentUser && currentUser.email}</strong>
            </p>
        </div>
    )
}

export default Home
