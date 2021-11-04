import classes from "./Rows.module.css";
import { ReactChild } from "react";

const Rows: React.FC<{ children: ReactChild|ReactChild[] }> = ({ children }) => {
  return <div className={classes.rows}>{children}</div>;
};

export default Rows;
