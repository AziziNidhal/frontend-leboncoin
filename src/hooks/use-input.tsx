import React, { useReducer } from "react";

type inputValuesType = {
  value: string;
  touched: boolean;
  valueIsValid: boolean;
  inputIsInvalid: boolean;
};

type reducerInputAction =
  | {
      type: "INIT";
    }
  | {
      type: "UPDATE";
      value: string;
      validityCheck: (value: string) => boolean;
    }
  | {
      type: "BLUR";
      validityCheck: (value: string) => boolean;

    };

const initInputValues: inputValuesType = {
  value: "",
  touched: false,
  valueIsValid: false,
  inputIsInvalid: false,
};

const inputReducer = (
  lastState: inputValuesType = initInputValues,
  action: reducerInputAction
) => {
  if (action.type === "UPDATE") {
    return {
      value: action.value,
      touched: true,
      valueIsValid: action.validityCheck(action.value),
      inputIsInvalid: !action.validityCheck(action.value),
    };
  }

  if (action.type === "BLUR") {
    return {
      value: lastState.value,
      touched: true,
      valueIsValid: lastState.valueIsValid,
      inputIsInvalid:  !action.validityCheck(lastState.value),
    };
  }
  if (action.type === "INIT") {
    return {
      value: "",
      touched: false,
      valueIsValid: false,
      inputIsInvalid: false,
    };
  }

  return lastState;
};

const useInput = (
  checkIfIsValid: (value: string) => boolean,
  validityClasses: string,
  invalidityClasses: string
) => {
  const [inputState, inputDispatch] = useReducer(inputReducer, initInputValues);

  const inputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
      console.log(checkIfIsValid(inputState.value))
    inputDispatch({
      type: "UPDATE",
      value: event.currentTarget.value,
      validityCheck: checkIfIsValid,
    });
  };

  const inputBlur = (event: React.FormEvent<HTMLInputElement>) => {
    inputDispatch({ type: "BLUR",validityCheck: checkIfIsValid });
  };

  const initInput = () => {
    inputDispatch({ type: "INIT" });
  };

  const inputClassNames = inputState.inputIsInvalid
    ? invalidityClasses
    : validityClasses;

  const { value, valueIsValid, inputIsInvalid } = inputState;
  return {
    value,
    valueIsValid,
    inputIsInvalid,
    inputChangeHandler,
    inputBlur,
    initInput,
    inputClassNames,
  };
};

export default useInput;
