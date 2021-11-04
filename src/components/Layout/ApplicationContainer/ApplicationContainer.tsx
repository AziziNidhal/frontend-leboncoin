import classes from "./ApplicationContainer.module.css";
import { ReactChild } from "react";
import Navbar from "./../Navbar/Navbar";
import Rows from "./../Rows/Rows";
import Main from "./../Main/Main";
import Sidebar from "./../Sidebar/Sidebar";

type Props = {
  navbarContent: ReactChild | ReactChild[];
  sidebarHeader: ReactChild | ReactChild[];
  mainContent: ReactChild | ReactChild[];
  sidebarBody: ReactChild | ReactChild[];
};

const ApplicationContainer: React.FC<Props> = ({
  navbarContent,
  sidebarHeader,
  sidebarBody,
  mainContent,
}) => {
  return (
    <div className={classes.container}>
      <Navbar navbarContent={navbarContent} onLogout={() => {}} />
      <Rows>
        <Sidebar header={sidebarHeader} body={sidebarBody} />

        <Main>{mainContent}</Main>
      </Rows>
    </div>
  );
};

export default ApplicationContainer;
