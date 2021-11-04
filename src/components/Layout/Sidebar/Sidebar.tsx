import classes from "./Sidebar.module.css";
import CardHeader from "./../../UI/Card/CardHeader/CardHeader";
import CardBody from "./../../UI/Card/CardBody/CardBody";
import Card from "../../UI/Card/Card";
import { ReactChild } from "react";

const Sidebar: React.FC<{
  header: ReactChild | ReactChild[];
  body: ReactChild | ReactChild[];
}> = ({ header, body }) => {
  return (
    <div className={classes.sidebar}>
      <Card>
        <CardHeader classNames={classes["bg-info"]}>{header}</CardHeader>
        <CardBody>{body}</CardBody>
      </Card>
    </div>
  );
};

export default Sidebar;
