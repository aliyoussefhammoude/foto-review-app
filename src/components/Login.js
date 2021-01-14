import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/RouteAuth'

const Login = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            await login(email, password)
            navigate('/albums')
        } catch (e) {
            setError("Email or password are invalid")
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p> 
                <form onSubmit={handleSubmit}>
                    
                    <h1>Log in to create albums to your photos!</h1>

                    <div className="inputFields">
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..."/> 
                            
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..."/> 
                    </div>
                    
                    <div className="btnContainer">
                        <div className="btns">
                            <button disabled={loading} id="signIn">LOGIN</button>
                            <Link to="/register"><button disabled={loading}>Sign up</button></Link>
                        </div>
                        <p>Forgot your password? <Link to="/reset-password">Click Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
