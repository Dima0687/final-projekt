import "./Calender.css";
import axios from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { FilterOptionContext } from "../context/FilterOptionContext";
import FilterSite from "../components/NavBar/FilterSite";
import SideNav from "../components/SideNav/SideNav";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { format, addDays, subDays, addMonths, subMonths } from "date-fns";
import { de } from "date-fns/locale";
import { NavLink } from "react-router-dom";

const Calendar = () => {
 
  document.title = "Eventlookup | Kalender";
  const [city] = useContext(FilterOptionContext);

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [lookingForDay, setLookingForDay] = useState(true);
  const [eventLimit, setEventLimit] = useState(20);

  const handleAddDate = () => {
    if (lookingForDay) {
      setDate(addDays(date, 1));
    } else {
      setDate(addMonths(date, 1));
    }
  };

  const handleSubDate = () => {
    if (lookingForDay) {
      setDate(subDays(date, 1));
    } else {
      setDate(subMonths(date, 1));
    }
  };

  const handleResetDate = () => {
    setLookingForDay(true);
    setDate(new Date());
  };

  const handleNextDay = () => {
    setLookingForDay(true);
    setDate(addDays(new Date(), 1));
  };

  const handleNextMonth = () => {
    setLookingForDay(false);
    setDate(addMonths(new Date(), 1));
  };

  const handleResetMonth = () => {
    setLookingForDay(false);
    setDate(new Date());
  };

  const handleEventLimit = (e) => {
    setEventLimit(e.target.value);
  };

  useEffect(() => {
    let url;

    const fetchData = async () => {
      if (lookingForDay && city === "") {
        url = `/events?day=${format(date, `dd.MM.yyyy`)}&limit=${eventLimit}`;
      } else if (lookingForDay) {
        url = `/events?day=${format(
          date,
          `dd.MM.yyyy`
        )}&limit=${eventLimit}&city=${city}`;
      } else if (city === "") {
        url = `/events?month=${format(date, `MM.yyyy`)}&limit=${eventLimit}`;
      } else {
        url = `/events?month=${format(
          date,
          `MM.yyyy`
        )}&limit=${eventLimit}&city=${city}`;
      }

      try {
        const res = await axios.get(url);
        setEvents(res.data.events);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [lookingForDay, date, eventLimit, city]);

  return (
    <div className="Calendar">
      <main>
        <div id="SideNav_Cal">
          <section id="SideNav">
            <SideNav
              today={handleResetDate}
              tomorrow={handleNextDay}
              month={handleResetMonth}
              nextMonth={handleNextMonth}
            />
          </section>
          <div id="Cal_Date_Cal">
            <section id="Date_Cal">
              <FilterSite
                today={handleResetDate}
                tomorrow={handleNextDay}
                month={handleResetMonth}
                nextMonth={handleNextMonth}
              />
              <div>
                <BsFillArrowLeftCircleFill
                  onClick={handleSubDate}
                  className="pfeile"
                />
                <span id="ausgabe">
                  {lookingForDay
                    ? format(date, "EEEE, dd.MM.yyyy", { locale: de })
                    : format(date, "MMMM yyyy", { locale: de })}
                </span>
                <BsArrowRightCircleFill
                  onClick={handleAddDate}
                  className="pfeile"
                />
              </div>
              <div>
                <label htmlFor="amount-select">Anzahl der Events: </label>
                <select
                  name="amount"
                  id="amount-select"
                  onChange={handleEventLimit}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </section>
            <section id="Cal">
              {events.length === 0 ? (
                <p id="notEvent">
                  Wir haben kein Event an diesem Datum.
                </p>
              ) : (
                <p></p>
              )}
              {events.map((event) => (
                <NavLink
                  to={`/event/${event._id}`}
                  key={event._id}
                  state={events}
                >
                  <div className="event">
                    {event.host}
                    <br />
                    <p>{event.title}</p>
                    <p>{event.location.city}</p>
                  </div>
                </NavLink>
              ))}{" "}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
