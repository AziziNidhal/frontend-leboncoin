import classes from "./../Auth.module.css";
import { useRouter } from "next/router";
import useInput from "./../../../hooks/use-input";
import minLengthValidator from "./../../../validations/minLengthValidator";
import bind_args_from_n from "./../../../utilities/bindArgsFromN";
import emailValidator from "./../../../validations/emailValidaor";
import React, { useEffect, useRef } from "react";
import useHttp from "./../../../hooks/use-http";
import RequestConfig from "../../../types/RequestConfig";

const CreateAccountForm: React.FC<{ params: string|string[] }> = ({ params }) => {
  const router = useRouter();
  const { sendRequest, isLoading, error } = useHttp();
  const nicknameValidator = bind_args_from_n(minLengthValidator, 2, 4);
  const passwordValidator = bind_args_from_n(minLengthValidator, 2, 8);
  const passwordVerifEqual = (value: string, password: string) => {
    console.log(`${value} vs ${password}`);
    return value === password;
  };

  const {
    value: nicknameValue,
    valueIsValid: nicknameIsValid,
    inputIsInvalid: nicknameInputIsInvalid,
    inputChangeHandler: nicknameInputChangeHandler,
    inputBlur: nicknameInputBlur,
    initInput: nicknameInitInput,
    inputClassNames: nicknameInputClassNames,
  } = useInput(
    nicknameValidator,
    classes.control,
    `${classes.control} ${classes.invalid}`
  );
  const {
    value: emailValue,
    valueIsValid: emailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlur: emailInputBlur,
    initInput: emailInitInput,
    inputClassNames: emailInputClassNames,
  } = useInput(
    emailValidator,
    classes.control,
    `${classes.control} ${classes.invalid}`
  );
  const {
    value: passwordValue,
    valueIsValid: passwordIsValid,
    inputIsInvalid: passwordInputIsInvalid,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlur: passwordInputBlur,
    initInput: passwordInitInput,
    inputClassNames: passwordInputClassNames,
  } = useInput(
    passwordValidator,
    classes.control,
    `${classes.control} ${classes.invalid}`
  );
  const {
    value: passwordVerifValue,
    valueIsValid: passwordVerifIsValid,
    inputIsInvalid: passwordVerifInputIsInvalid,
    inputChangeHandler: passwordVerifInputChangeHandler,
    inputBlur: passwordVerifInputBlur,
    initInput: passwordVerifInitInput,
    inputClassNames: passwordVerifInputClassNames,
  } = useInput(
    bind_args_from_n(passwordVerifEqual, 2, passwordValue),
    classes.control,
    `${classes.control} ${classes.invalid}`
  );

  const imageRef = useRef<HTMLInputElement>(null);

  const formValid =
    nicknameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordValue === passwordVerifValue;

  const navigateToLoginHandler = (event: React.FormEvent) => {
    router.push("/auth/signin");
  };

  const createAccountHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nicknameValue);
    formData.append("email", emailValue);
    formData.append("password", passwordValue);
    const image = imageRef.current.files[0];
    formData.append("image", image);

    const requestConfig: RequestConfig = {
      url: "http://localhost:8080/auth/signup",
      method: "PUT",
      body: formData,
    };
    sendRequest(
      requestConfig,
      (res) => {
        if (res.userId) {
          router.push("/auth/signin/created");
        }
      },
      (statusCode) => {
          console.log(statusCode)
        
            console.log('here')
            router.push("/auth/signup/error");
        
      }
    );
  };



  let htmlMessage = params && params[0] && params[0] === "error" && (
    <div>
        <h4>User cannot be created, error management to develop</h4>
    </div>
  );

  return (
    <section className={classes.auth}>
      <h1>Create Account</h1>
      {htmlMessage}
      <form onSubmit={createAccountHandler}>
        <div className={nicknameInputClassNames}>
          <label htmlFor="nickname">Your Nickname</label>
          <input
            type="text"
            id="nickname"
            value={nicknameValue}
            onChange={nicknameInputChangeHandler}
            onBlur={nicknameInputBlur}
          />
        </div>
        <div className={emailInputClassNames}>
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            id="email"
            value={emailValue}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlur}
          />
        </div>
        <div className={passwordInputClassNames}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlur}
          />
        </div>
        <div className={passwordVerifInputClassNames}>
          <label htmlFor="passwordVerif">Verify Password</label>
          <input
            type="password"
            id="passwordVerif"
            value={passwordVerifValue}
            onChange={passwordVerifInputChangeHandler}
            onBlur={passwordVerifInputBlur}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" ref={imageRef} />
        </div>

        <div className={classes.actions}>
          <button disabled={!formValid}>Create Account</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={navigateToLoginHandler}
          >
            Login with your credentials
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateAccountForm;
