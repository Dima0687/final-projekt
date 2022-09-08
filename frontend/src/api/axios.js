import axios from "axios";

export default axios.create({
  withCredentials:true,
  validateStatus: () => true,
  baseURL: 'https://eventlookup-backend.onrender.com/',
  headers: {
    'Access-Control-Allow-Origin': true
  }
})