import {createContext, useEffect, useState, useContext} from "react"
import {auth} from "../firebase"
import {ClipLoader} from "react-spinners"

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
            {loading && (
                <div className="d-flex justify-content-center my-5">
                    <ClipLoader color={"#888"} size={70} />
                </div>
            )}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, useAuth, AuthContextProvider as default}
