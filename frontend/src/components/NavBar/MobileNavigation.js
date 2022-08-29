import NavLinks from "./NavLinks";
import "./NavBar.css"
import { TbMenu2 } from 'react-icons/tb';
import {CgClose} from "react-icons/cg";
import { useContext } from "react";
import { MenuContext } from "../../context/MobileNavBarContext";

const MobileNavigation = () => {
const {open, setOpen} = useContext(MenuContext);

const hamburgerIcon = <TbMenu2 onClick={() => setOpen(true)} className="hamburger"/>;
const closeIcon = <CgClose onClick={() => setOpen(false)} className="hamburger"/>;

return(
        <nav className="mobile-nav">
            
            {open ? closeIcon : hamburgerIcon}
            {open && <div className="mobile-navlinks"><NavLinks/></div>}
            
       </nav>
    )
}

export default MobileNavigation;