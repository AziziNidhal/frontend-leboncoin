import { useRouter } from "next/router";
import { useContext } from "react";

import LoginForm from "./../../../components/auth/Login/LoginForm";
import AuthContext from "./../../../store/auth-context";
const Signin = () => {
  const router = useRouter();
 
  return <LoginForm params={router.query.slug} />;
};

export default Signin;
