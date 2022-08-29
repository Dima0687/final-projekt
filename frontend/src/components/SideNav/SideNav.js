// import FilterLinks from './FilterLinks';
import './SideNav.css';
import {useContext} from 'react';
import { getMonth } from 'date-fns/esm';
import {FilterOptionContext} from "../../context/FilterOptionContext";

function SideNav(props) {

  const monat = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  const [city, setCity] = useContext(FilterOptionContext);

    return (
      <div className="SideNav">
        {/* <FilterLinks /> */}
        <aside>
          <div onClick={props.today}>heute</div>
          <div onClick={props.tomorrow}>morgen</div>
          <div onClick={props.month}>{monat[getMonth(new Date())]}</div>
          <div onClick={props.nextMonth}>{monat[getMonth(new Date())+1]}</div>
          <div id="Suche">
            <form>
              <input type="text" value={city} onChange={(event) => setCity(event.target.value.substring(0,1).toUpperCase() + event.target.value.substring(1).toLowerCase())} placeholder='Ort' size="10" maxLength="20"/>
            </form>
          </div>
        </aside>
      </div>
    );
  }
  export default SideNav;