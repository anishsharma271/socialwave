import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Redux/Auth/Auth";

const Store=configureStore({
   reducer:{
    Auth
   } 
})
export default Store;