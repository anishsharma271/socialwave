import axios from "axios";

export default axios.create({
 
  baseURL: process.env.REACT_APP_LocalHost,
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }

})