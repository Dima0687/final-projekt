import {createContext} from 'react';
import axios from "axios";

export const AxiosContext = createContext();

export const AxiosContextProvider = ({children}) => {
    const URL = `https://eventlookup.herokuapp.com`;

    const eventLookup = axios.create(URL);
    return(
        <AxiosContext.Provider value={{eventLookup}}>
            {children}
        </AxiosContext.Provider>
    )
}