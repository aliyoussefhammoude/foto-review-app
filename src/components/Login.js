import React from "react"
import {Link} from "react-router-dom"

const Login = () => {
    return (
        <div>
            <p>This is my login</p>
            <p>
                <Link to="/signup">Sign up</Link>
            </p>
        </div>
    )
}

export default Login
