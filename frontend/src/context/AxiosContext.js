import {createContext} from 'react';
import axios from "axios";

export const AxiosContext = createContext();

export const AxiosContextProvider = ({children}) => {
    const URL = 'https://eventlookup-backend.onrender.com/';

    const eventLookup = axios.create(URL);
    return(
        <AxiosContext.Provider value={{eventLookup}}>
            {children}
        </AxiosContext.Provider>
    )
}