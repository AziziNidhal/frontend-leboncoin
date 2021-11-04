import { useContext, useEffect } from "react";
import Application from "../../components/Application/Application";
import AuthContext from "./../../store/auth-context";
import { useRouter } from "next/router";
import Signin from "../auth/signin/[[...slug]]";

const ApplicationPage = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const { isLoggedIn, authData, logout } = authCtx;

  
  if (authData && authData.token) {
    return  <Application authData={authData} logout={logout} />;

  } else {
    return <Signin />;
  }

};

export default ApplicationPage;
