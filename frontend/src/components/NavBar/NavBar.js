import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import "./NavBar.css";
import { MenuContextProvider } from "../../context/MobileNavBarContext";

const NavBar = (props) => {

  return (
    <div className="navbar">
      <MenuContextProvider>
        <MobileNavigation />
        <DesktopNavigation />
      </MenuContextProvider>
    </div>
  );
};

export default NavBar;
