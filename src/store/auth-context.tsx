import { createContext } from "react";
import { AuthData } from "../types/AuthData";

type Props ={
    authData:AuthData,
    isLoggedIn:boolean,
    login:(user:AuthData)=>void,
    logout:()=>void,
    checkIfLoggedIn:()=>boolean
}
const AuthContext = createContext({
    authData:null,
    isLoggedIn:false,
    login:(user:AuthData)=>{},
    logout:()=>{},
    checkIfLoggedIn:()=>{}
})

export default AuthContext;