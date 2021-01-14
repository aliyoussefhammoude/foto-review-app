import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <div >
            <div>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign up</Link>
            </div>
        </div>
    )
}

export default Home
