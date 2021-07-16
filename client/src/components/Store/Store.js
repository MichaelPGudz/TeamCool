import React, {useEffect, useReducer} from "react";
import {initialUserState, userReducer} from './UserReducer';

export const UserContext = React.createContext({
    state: initialUserState,
    dispatch: () => null
})


const Store = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);
    const userId = window.localStorage.getItem('id');

    useEffect( () => {
            fetch(`https://localhost:5001/api/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    dispatch({type: 'SET_USER', payload: data});
                });
    }, [userId])


    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}

export default Store;