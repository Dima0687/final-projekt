import "./Create.css"
import { useState , useEffect, useContext } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { LoginAuthContext } from "../context/LoginAuthContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
    document.title = "Eventlookup | Create";
    const navigate = useNavigate();
    const { setAuthOption } = useAuth();
    const { loggedIn, organizer } = useContext(LoginAuthContext);

    const [inputVeranstaltungsName, setInputVeranstaltungsName] = useState("")
    const [inputLocation, setInputLocation] = useState("")
    const [inputDatum, setInputDatum] = useState("")
    const [inputUhrzeit, setInputUhrzeit] = useState("")
    const [inputBeschreibung, setInputBeschreibung] = useState("")
    const [inputStraße, setInputStraße] = useState("")
    const [inputHausnr, setInputHausnr] = useState("")
    const [inputPLZ, setInputPLZ] = useState("")
    const [inputStadt, setInputStadt] = useState("")
    const [inputEmail, setInputEmail] = useState("")

    const[message, setMessage] = useState("");

    const [errors , setErrors] = useState("")
    
    const capitalize = (string) => {
        let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
        return capitalized
    }


    const onChangeHandlerVeranstaltungsName = (e) => {
        setInputVeranstaltungsName(e.target.value)
    }
    const onChangeHandlerLocation = (e) => {
        setInputLocation(e.target.value)
    }
    const onChangeHandlerDatum = (e) => {
        setInputDatum(e.target.value)
    }
    const onChangeHandlerUhrzeit = (e) => {
        setInputUhrzeit(e.target.value)
    }
    const onChangeHandlerBeschreibung = (e) => {
        setInputBeschreibung(e.target.value)
    }
    const onChangeHandlerStraße = (e) => {
        setInputStraße(e.target.value)
    }
    const onChangeHandlerHausnr = (e) => {
        setInputHausnr(e.target.value)
    }
    const onChangeHandlerPLZ = (e) => {
        setInputPLZ(e.target.value)
    }
    const onChangeHandlerStadt = (e) => {
        setInputStadt(e.target.value)
    }
    const onChangeHandlerEmail = (e) => {
        setInputEmail(e.target.value)
    }


    useEffect(() => {
      if(!loggedIn){
         navigate('/login')
      }
      setAuthOption('refresh');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    let body = {
        title: capitalize(inputVeranstaltungsName),
        description: capitalize(inputBeschreibung),
        location: {
            street: capitalize(inputStraße),
            houseNr: inputHausnr,
            city: capitalize(inputStadt),
            zip: inputPLZ
        },
        host: capitalize(inputLocation),
        eventTime: inputUhrzeit,
        eventDate: inputDatum,
        cancelled: false,
        postponed: false,
        participants: [],
        website: inputEmail

    }

    const handleSubmit = async (e) => {
        setMessage("");
        setErrors("")
        e.preventDefault();
        try {
          let response = await axios.put("/events",
              body
            , 
            {
              withCredentials: true 
            }
          );
          if(response.status === 400) {
            setErrors(response.data.msg);
          } else if(response.status === 201) {
            const msg = `${response.data.msg}, Weiterleitung zum Kalender...`
            setMessage(msg)
          }
          if(response.data.msg === 'Event wurde erstellt'){
            setTimeout(() => {
                navigate("/");
            }, 3000);
          }
        } catch (error) {
        //  console.error(error?.response?.data?.errors);
          if(error.response) setErrors(error.response.data.msg);
          
        }
    }  
    if(loggedIn && !organizer) {
        return (
            loggedIn &&
            <div className="create">
                <main>
                    <p>Bitte erstelle ein Konto für Veranstalter.</p>
                </main>
            </div>
        )
    } else {
    return (
      loggedIn &&
        <div className="create">
            <main>
                <h2>Trage eine Veranstaltung ein</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChangeHandlerVeranstaltungsName} type="text" placeholder="Name der Veranstaltung" required></input>
                    {errors.title && <p className="error-message">{errors.title}</p>}
                    <input onChange={onChangeHandlerLocation} type="text" placeholder="Location" required></input>
                    {errors.host && <p className="error-message">{errors.host}</p>}
                    <input onChange={onChangeHandlerDatum} type="text" placeholder="Datum" required></input>
                    <input onChange={onChangeHandlerUhrzeit} type="text" placeholder="Uhrzeit" required></input>
                    {errors.eventTime && <p className="error-message">{errors.eventTime}</p>}
                    <textarea onChange={onChangeHandlerBeschreibung} placeholder="Beschreibung" required></textarea>
                    <input onChange={onChangeHandlerEmail} type="text" placeholder="Email (Optional)" ></input>
                    <h5>Adresse</h5>
                    <input onChange={onChangeHandlerStraße} type="text" placeholder="Straße" required></input>
                    {errors.street && <p className="error-message">{errors.street}</p>}
                    <input onChange={onChangeHandlerHausnr} type="text" placeholder="Hausnr." required></input>
                    {errors["location.houseNr"] && <p className="error-message">{errors["location.houseNr"]}</p>}
                    <input onChange={onChangeHandlerPLZ} type="text" placeholder="PLZ" required></input>
                    {errors["location.zip"] && <p className="error-message" >{errors["location.zip"]}</p>}
                    <input onChange={onChangeHandlerStadt} type="text" placeholder="Stadt" required></input>
                    {errors.city && <p className="error-message">{errors.city}</p>}
                    <button type="submit">Absenden</button>
                    <h5 style= {{color: "green"}}>{message}</h5>
                </form>
                
            </main>
            
        </div>
    );
    }
}

export default Create;