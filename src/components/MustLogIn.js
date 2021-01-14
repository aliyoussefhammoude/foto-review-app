import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../contexts/ContextComp'

const MustLogIn = (props) => {

    const { currentUser } = useAuth()

    return (
        currentUser 
            ? <Route {...props} />
			: <Navigate to='/login' />
        
    )
}

export default MustLogIn
