import {createContext, useEffect, useState, useContext} from "react"
import {auth} from "../firebase"

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        //sign user up
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // auth state changed by a user by either log in or log out.
            console.log("Auth state changed", user)
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const contextValues = {
        currentUser,
        loading,
        signup,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading && <p>Loading...</p>}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, useAuth, AuthContextProvider as default}
