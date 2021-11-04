import { ReactChild, useCallback, useEffect, useState } from "react";
import { AuthData } from "../types/AuthData";
import AuthContext from "./auth-context";

const AuthProvider: React.FC<{ children: ReactChild | ReactChild[] }> = ({
  children,
}) => {
  const getLocalStorage = () => {
    return {
      token: localStorage.getItem("token"),
      nickname: localStorage.getItem("nickname"),
      expiresIn: localStorage.getItem("expiresIn"),
      userId: localStorage.getItem("userId"),
      imageUrl: localStorage.getItem("imageUrl"),
    };
  };

  const setLocalStorage = (authData: AuthData) => {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("nickname", authData.nickname);
    localStorage.setItem("expiresIn", authData.expiresIn.toString());
    localStorage.setItem("userId", authData.userId);
    localStorage.setItem("imageUrl", authData.imageUrl);
  };
  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("imageUrl");
  };
  const [authData, setAuthData] = useState<AuthData>(null);

  const test = useCallback(() => {
    if (typeof window !== "undefined" && window.localStorage) {
        console.log('here')
      const { token, nickname, expiresIn, userId, imageUrl } =
        getLocalStorage();

      const authDataFromLocalStorage = new AuthData(
        token,
        expiresIn,
        nickname,
        imageUrl,
        userId
      );
      console.log("from localstorage", authDataFromLocalStorage);
      setAuthData(authDataFromLocalStorage);
    }
  }, []);

  useEffect(test, [test]);

  const userIsLoggedIn = authData && authData.token ? true : false;

  const loginHandler = (authData: AuthData) => {
    setLocalStorage(authData);
    setAuthData(authData);
  };

  const logoutHandler = () => {
    clearLocalStorage();
    setAuthData(null);
  };

  const checkIfLoggedIn = () => {
    return localStorage.getItem("token");
  };

  const authValue = {
    authData: authData,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    checkIfLoggedIn: checkIfLoggedIn,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
