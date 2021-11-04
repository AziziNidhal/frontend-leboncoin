import React, { ReactChild, useContext, useRef } from "react";
import classes from "./../Auth.module.css";
import { useRouter } from "next/router";
import useHttp from "./../../../hooks/use-http";
import RequestConfig from "../../../types/RequestConfig";
import { AuthData } from "../../../types/AuthData";
import AuthContext from './../../../store/auth-context';

const LoginForm: React.FC<{ params?: string | string[] | null }> = ({ params }) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const { sendRequest, isLoading, error } = useHttp();
  const nicknameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const navigateToSignupHandler = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/auth/signup");
  };

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const nickname = nicknameInput.current.value;
    const password = passwordInput.current.value;


    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("password", password);


    const requestConfig: RequestConfig = {
      url: "http://localhost:8080/auth/login",
      method: "POST",
      body: formData,
    };
    sendRequest(
      requestConfig,
      (res) => {
        if (res.userId) {
          console.log(res)
          const authenticatedUser = new AuthData(res.token,res.expiresIn,res.nickname,res.imageUrl,res.userId)
          authCtx.login(authenticatedUser)
          router.push("/application");
        }
      },
      (error) => {
        console.log("here", error);
        router.push("/auth/signin/error");
      }
    );
  };

  let htmlMessage;
  if (params && params[0]) {
    const msg = params[0];
    if (msg === "created") {
      htmlMessage = (
        <div>
          <h3>User created successfully,please log in</h3>
        </div>
      );
    }else if(msg === "error") {
      htmlMessage = (
        <div>
          <h3>Login Failed, try again</h3>
        </div>
      );
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      {htmlMessage}
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="nickname">Your Nickname</label>
          <input type="text" id="nickname" required ref={nicknameInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={navigateToSignupHandler}
          >
            Create new account
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
