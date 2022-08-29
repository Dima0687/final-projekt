import { useEffect , useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const Signup = () => {
  document.title = "Eventlookup | Signup";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [organizer, setOrganizer] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [houseNr, setHouseNr] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  // error messages
  const [frontendErr, setFrontendErr] = useState("");
  const [errMsg, setErrMsg] = useState(""); //error from axios
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [userAvailableErr , setUserAvailableErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [lastnameErr, setLastnameErr] = useState("");
  const [streetErr, setStreetErr] = useState("");
  const [housenrErr, setHousenrErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [zipErr, setZipErr] = useState("");
  //successful registered message
  const [registeredMsg, setRegisteredMsg] = useState("");

  // handlers
  const usernameHandler = (e) => {
    setUsername(e.target.value);
    setUsernameErr("");
    setRegisteredMsg('');
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
    setRegisteredMsg('');
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
    setFrontendErr("");
  };
  const organisatorHandler = (e) => {
    organizer === false ? setOrganizer(true) : setOrganizer(false);
  };
  const firstnameHandler = (e) => {
    setFirstname(e.target.value);
    setFirstnameErr('');
    setRegisteredMsg('');
  };
  const lastnameHandler = (e) => {
    setLastname(e.target.value);
    setLastnameErr('');
    setRegisteredMsg('');
  };
  const streetHandler = (e) => {
    setStreet(e.target.value);
    setStreetErr('')
  };
  const housenrHandler = (e) => {
    setHouseNr(e.target.value);
    setHousenrErr('');
  };
  const cityHandler = (e) => {
    setCity(e.target.value);
    setCityErr('');
  };
  const zipHandler = (e) => {
    setZip(Number(e.target.value));
    setZipErr('');
  };
  useEffect(() => {
    setOrganizer(organizer);
  }, [organizer]);

  useEffect(() => {
    // Error updating beim ersten klick
    if (errMsg) {
      if (errMsg.username) {
        setUsernameErr(errMsg.username);
      }
      if (errMsg.email) {
        setEmailErr(errMsg.email);
      }
      if (errMsg.password) {
        setPasswordErr(errMsg.password);
      }
      if(errMsg.firstname){
        setFirstnameErr(`Vorname muss enthalten sein`);
      }
      if(errMsg.lastname){
        setLastnameErr(`Nachname muss enthalten sein`);
      }
      if(errMsg["address.street"]){
        setStreetErr(`Straße muss enthalten sein`)
      }
      if(errMsg["address.houseNr"]){
        setHousenrErr(`Haus Nr. muss enthalten sein`)
      }
      if(errMsg["address.city"]){
        setCityErr(`Stadt muss enthalten sein`)
      }
      if(errMsg["address.zip"]){
        setZipErr(`PLZ muss enthalten sein`)
      }
      if(typeof(errMsg) !== 'object'){
        setUserAvailableErr(errMsg)
      }
    }
    setRegisteredMsg(registeredMsg);
  }, [errMsg, registeredMsg]);

  const signUpFunc = async () => {
    try {
      const body = {
        username,
        email,
        password,
        organizer: organizer,
        firstname,
        lastname,
        address: {
          street,
        houseNr,
        city,
        zip,
      }
      
    };
      const res = await axios.post("/signup",
        body,
      {
        withCredentials:true
      });
      if(res.status === 400){
        setErrMsg(res?.data?.msg);
      } else if (res.status === 201){
        setRegisteredMsg(res.data.msg)
        setTimeout( () => {
          navigate('/login')
          setRegisteredMsg(res?.data.msg);
        }, 3000)
      }
    } catch (err) {
      setErrMsg(err?.response?.data?.msg);
    }
  };
  const onSignUpHandler = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setFrontendErr("Bitte füllen Sie die Pflichtpfelder aus.");
      if (!username) {
        setFrontendErr(
          "Der Username muss zwischen 3 und 50 Zeichen lang sein."
        );
      } else if (!email) {
        setFrontendErr("Bitte gib eine gültige Email-Adresse an.");
      } else if (!password) {
        setFrontendErr("Das Passwort muss mindestens 10 Zeichen lang sein.");
      } else if (organizer && (!firstname || !lastname || !street || !houseNr || !city || !zip)){
        setFrontendErr(`Bitte tragen Sie die fehlenden Informationen ein`)
      }
      return;
    } else {
      await signUpFunc();
    }
  };

  return (
    <main className="main-signup">
      <form action="" className="form-signup">
        <h2>Registrieren</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nutzername"
          onChange={usernameHandler}
          required
        />

        <p className="err-msg">{usernameErr}</p>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={emailHandler}
          required
        />

        <p className="err-msg">{emailErr}</p>

        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Passwort"
          requiredonchange="true"
          onChange={passwordHandler}
        />

        <p className="err-msg">{passwordErr}</p>

        <p className="err-msg">{frontendErr}</p>

        <label htmlFor="veranstalter">
          <input
            type="checkbox"
            name="veranstalter"
            id="veranstalter"
            onClick={organisatorHandler}
          />
          Veranstalter
        </label>

        {organizer && (
          <>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Vorname"
              onChange={firstnameHandler}
              required
            />
            <p className="err-msg">{firstnameErr}</p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nachname"
              onChange={lastnameHandler}
              required
            />
            <p className="err-msg">{lastnameErr}</p>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Straße"
              onChange={streetHandler}
              required
            />
            <p className="err-msg">{streetErr}</p>
            <input
              type="text"
              name="housenr"
              id="housenr"
              placeholder="Haus Nr."
              onChange={housenrHandler}
              required
            />
            <p className="err-msg">{housenrErr}</p>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Stadt"
              onChange={cityHandler}
              required
            />
            <p className="err-msg">{cityErr}</p>
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="PLZ"
              onChange={zipHandler}
              required
            />
            <p className="err-msg">{zipErr}</p>
          </>
        )}
        <button type="submit" onClick={onSignUpHandler}>
          Neu anmelden
        </button>

        {registeredMsg && (
          <p className="registered-msg">
            Für {username} wurde ein Benutzerkonto angelegt!
          </p>
        )}

        <p className="login-now">Schon registriert? <a href="/login">Jetzt anmelden</a></p>
        {userAvailableErr && <p>{userAvailableErr}</p>}

      </form>
    </main>
  );
};

export default Signup;
