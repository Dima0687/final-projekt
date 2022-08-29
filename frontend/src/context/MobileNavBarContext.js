import {createContext} from 'react';
import { useState } from 'react';

export const MenuContext = createContext();
export const MenuContextProvider = ({children}) => {

    const [open, setOpen] = useState(false)
    return(
        <MenuContext.Provider value={{open, setOpen}}>
            {children}
        </MenuContext.Provider>
    )
}