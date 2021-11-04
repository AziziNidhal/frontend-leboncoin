import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Signin from "../../pages/auth/signin/[[...slug]]";
import AuthContext from "./../../store/auth-context";
import { AuthData } from "./../../types/AuthData";
import classes from "./Application.module.css";
import Navbar from "./../Layout/Navbar/Navbar";
import Sidebar from "./../Layout/Sidebar/Sidebar";
import Compose from "./../Compose/Compose";
import SelectedConversation from "./../SelectedConversation/SelectedConversation";
import ConnectedUser from "../ConnectedUser/ConnectedUser";

import ConversationItem from "./../ConversationItem/ConversationItem";
import Main from "./../Layout/Main/Main";
import ApplicationContainer from "./../Layout/ApplicationContainer/ApplicationContainer";
import Rows from "./../Layout/Rows/Rows";
import NavbarComponent from "./../NavbarComponent/NavbarComponent";
import SidebarHeader from "./../Layout/Sidebar/SidebarHeader/SidebarHeader";
import ConversationList from "../ConversationList/ConversationList";
import ConversationProvider from "../../store/conversation/ConversationProvider";

const Application: React.FC<{ authData: AuthData; logout: () => void }> = ({
  authData,
  logout,
}) => {
  const router = useRouter();
  //   const authCtx = useContext(AuthContext);
  //   const { isLoggedIn } = authCtx;

  const logoutHandler = () => {
    logout();
    router.replace("/auth/signin");
  };

  //   return (
  //     <div>
  //       <h1>Welcome {authData.nickname} to the application!</h1>
  //       <img src={`http://localhost:8080/${authData.imageUrl}`} style={{height:'200px',width:'200px'}} alt="" />
  //       <button onClick={logoutHandler}>Logout</button>
  //     </div>
  //   );

  const sideBarHeader = <ConnectedUser authData={authData} />;
  const sideBarBody = (
    <>
      <ConversationList />
    </>
  );

  const navbarContent = <NavbarComponent />;
  const mainContent = <SelectedConversation authData={authData} />;

  return (
    <ConversationProvider>
      <ApplicationContainer
        navbarContent={navbarContent}
        sidebarHeader={sideBarHeader}
        sidebarBody={sideBarBody}
        mainContent={mainContent}
      />
    </ConversationProvider>
  );
};

export default Application;
