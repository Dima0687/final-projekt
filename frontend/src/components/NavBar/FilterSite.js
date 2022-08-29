import "./FilterLinks.css";
import { CgClose } from "react-icons/cg";
import { BsFilterSquare } from "react-icons/bs";
import { useState, useContext } from "react";
import { getMonth } from "date-fns/esm";
import { FilterOptionContext } from "../../context/FilterOptionContext";

const FilterSite = (props) => {
  const monat = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const [city, setCity] = useContext(FilterOptionContext);

  function cityChange(event) {
    event.preventDefault();
  }

  const [open, setOpen] = useState(false);

  const button = (
    <button className="button" onClick={() => setOpen(true)}>
      FILTER <BsFilterSquare />
    </button>
  );
  const closeIcon = (
    <button className="button" onClick={() => setOpen(false)} >
    CLOSE <CgClose />
    </button>
  );

  return (
    <div>
      {open ? closeIcon : button}
      {open && (
        <div id="mobileFilterLinks">
          <div className="FilterLinks">
            <aside>
              <div onMouseDown={props.today} onMouseUp={()=>setOpen(false)}>heute</div>
              <div onMouseDown={props.tomorrow} onMouseUp={()=>setOpen(false)}>morgen</div>
              <div onMouseDown={props.month} onMouseUp={()=>setOpen(false)}>{monat[getMonth(new Date())]}</div>
              <div onMouseDown={props.nextMonth} onMouseUp={()=>setOpen(false)}>
                {monat[getMonth(new Date()) + 1]}
              </div>
              <div id="Suche">
                <form onSubmit={cityChange}>
                  <input
                    type="text"
                    value={city}
                    placeholder="Ort"
                    size="10"
                    maxLength="20"
                    onChange={(event) => setCity(event.target.value.substring(0,1).toUpperCase() + event.target.value.substring(1).toLowerCase())}
                  />
                  <button id="los" onClick={()=>setOpen(false)}>los</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSite;
