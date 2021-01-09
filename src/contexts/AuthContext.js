import {createContext, useState} from "react"
import {Auth} from "../firebase"

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signup = (email, password) => {
        //sign user up
    }

    const contextValues = {
        currentUser,
        signup,
    }

    return <AuthContext.Provider value={contextValues}>{props.children}</AuthContext.Provider>
}

export {AuthContext, AuthContextProvider as default}
