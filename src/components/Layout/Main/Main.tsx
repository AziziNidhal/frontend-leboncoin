import classes from "./Main.module.css";
import { ReactChild } from "react";

const Main: React.FC<{ children: ReactChild | ReactChild[] }> = ({
  children,
}) => {
  return <div className={classes.main}>{children}</div>;
};

export default Main;
