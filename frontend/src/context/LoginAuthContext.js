import { useState , createContext } from "react";
import axios from 'axios';

export const LoginAuthContext = createContext();

export const LoginAuthContextProvider = ({children}) => {
    const [ token , setToken ] = useState('');
    const [loggedIn , setLoggedIn] = useState(false);
    const [organizer, setOrganizer] = useState(false);

    axios.defaults.headers.common['authorization'] = token || axios.defaults.headers.common.authorization;

    return (

        <LoginAuthContext.Provider value={{token , setToken , loggedIn , setLoggedIn, organizer, setOrganizer}}>
            {children}
        </LoginAuthContext.Provider>
    )
}