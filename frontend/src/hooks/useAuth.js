// react
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// util
import jwt_decode from 'jwt-decode';
import axios from "../api/axios";
// context
import { LoginAuthContext } from "../context/LoginAuthContext";
// import { BsBoxArrowInDownLeft } from "react-icons/bs";

const useAuth = () => {
  // hooks
  const navigate = useNavigate();
  const { setLoggedIn, setOrganizer } = useContext(LoginAuthContext);
  // useStates
  const [authOption, setAuthOption] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState(null);

  // helper functions
  const createGetAndSetRefreshToken = async () => {
    const res = await axios.get('/refresh')
    return setAxiosDefaultHeader(res.data.accessToken);
  }

  const setAxiosDefaultHeader = (token) => {

    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  
    const authHeader = { ...axios.defaults.headers.common };
    const isBearerIncluded = authHeader.authorization.includes('Bearer eyJh');
   
    /* 
      Wir dokodieren unser JW TOKEN in dem der erstell Zeitpunkt als auch der Ablaufzeitpunkt
      enthalten ist. Wir setzen daraufhin die setTimeout funktion die nach ablauf dieser
      Zeit feuert und den header leer macht, als auch den refreshToken aus der Datenbank
      im Dokument löscht! 
    */
    if(isBearerIncluded){
      const decodedToken = jwt_decode(token);
      const timeTillExpInMs = ( decodedToken.exp - decodedToken.iat ) * 1000;
      return setTimeout( async () => {
        axios.defaults.headers.common['authorization'] = "";
        await axios.get('/logout');
      }, timeTillExpInMs);
  
    } else {
      navigate('/login');
    }
  }

  const login = async () => {
    try {
      const res = await axios.post(
        "/login",
        {
          email,
          password,
        }
      );

      if(res.data.accessToken){
        const timer = setAxiosDefaultHeader(res.data.accessToken);
        clearTimeout(timer);
        navigate("/");
        setLoggedIn(true);
      }

      if(res.data.user.organizer === true) {
        setOrganizer(true);
      };

    } catch (err) { 
      setLoginErrors(err?.response?.data?.msg)
    }
  };

  useEffect(() => {

    (async () => {
      if(authOption === 'refresh'){
        createGetAndSetRefreshToken();
      }
      
      if(authOption === 'login'){
        login();
      }
  
      if(authOption === 'logout'){
        axios.defaults.headers.common['authorization'] = "";
        try {
          await axios.get('/logout');
        } catch(e) {
          console.error(e) 
        };
        setLoggedIn(false);
      }
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authOption]);

  return {
    setAuthOption,
    email,
    setEmail,
    password,
    setPassword,
    setOrganizer,
    loginErrors
  };
}
 
export default useAuth;