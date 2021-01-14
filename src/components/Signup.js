import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/RouteAuth'

const Signup = () => {

    //Login instructions
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    //Error and loading systems
    const [error, setError] = useState(null)
    const [, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const { signup } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            return setError("The password does not match")
        }

        setError(null);

        try {
            setLoading(true)
            await signup(email, password)
            navigate('/albums')
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }

    }

    return (
        <div className="login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p> 
                <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                    <div className="inputFields">
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." /> 
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                        <input type="password"  required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password..."/> 
                    </div>
                    <div className="btnContainer">
                        <div className="btns">
                        <button>Sign up</button>
                        </div>
                        <p>Already have an account? <Link to="/">Log In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
