import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/RouteAuth'

const ForgotPassword = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")
    
    const { resetPassword } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null);

        try {
            setLoading(true)
            await resetPassword(email)
            setSuccess(true)
        } catch (e) {
            setError("Something went wrong, please check if you typed in the right password")
            setLoading(false)
        }

    }

    return (
        <div className="container login">
            <div className="loginContainer">
                <p className="errorMsg">{error}</p>
                { 
                    !success && 

                    <form onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>
                        
                        <p>Please enter your email address and press send then follow instructions</p> 


                        <div className="inputFields">
                            
                            <input 
                                type="text" 
                                autoFocus 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email address..."
                            /> 
                        </div>
                        
                        <div className="btnContainer">
                            <div className="btns">
                                <button disabled={loading} className="btn btn-primary">Send</button>
                            </div>
                            <p>Back to <Link to="/">Log In</Link></p>
                        </div>
                    </form>

                }

                { 
                    success &&
                    
                    <div>
                        <div variant="success">
                            <p>Please check your email for further instructions</p>
                        </div>

                        <Link to="/" className="text-center mt-2">Log In</Link>
                    </div> 
                }
            </div>
        </div>
    )
}

export default ForgotPassword
