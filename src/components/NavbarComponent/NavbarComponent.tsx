import classes from "./NavbarComponent.module.css";
import UsersList from './../UsersList/UsersList';
import { useContext, useState } from "react";
import AuthContext from './../../store/auth-context';

const NavbarComponent = () => {

  const authCtx = useContext(AuthContext);
  const [showModalUsersList,setShowModalUsersList] = useState<boolean>(false);


  const toggleShowModalUsersList = () => {
    setShowModalUsersList(lastValue=>!lastValue)
  }


  return (
    <>
      <div className={`${classes.home} ${classes.element}`}>
        <a href="">Home</a>
      </div>
      <div className={`${classes.profile} ${classes.element}`}>
        <a onClick={toggleShowModalUsersList}>start conversation </a>
      </div>
      <div className={`${classes.logout} ${classes.element}`}>
        <a onClick={authCtx.logout}>Logout</a>
      </div>

      {showModalUsersList && <UsersList onClose={toggleShowModalUsersList}/>}
    </>
  );
};

export default NavbarComponent;
