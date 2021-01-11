import {createContext, useEffect, useState, useContext} from "react"
import {auth} from "../firebase"
import {RotateLoader} from "react-spinners"

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const signup = (email, password) => {
        //sign user up
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const updateEmail = (name) => {
		return currentUser.updateEmail({
			displayName: name
		})
	}

	const updatePassword = (password) => {
		return currentUser.updatePassword(password)
	}

	const updateProfile = (name) => {
		return currentUser.updateProfile({
			displayName: name
		})
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
        login,
        logout,
        resetPassword,
        signup,
        updateEmail,
		updatePassword,
		updateProfile,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading && (
                <div className="d-flex justify-content-center my-5">
                    <RotateLoader color={"#888"} size={20} />
                </div>
            )}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, useAuth, AuthContextProvider as default}
