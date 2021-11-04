import classes from './Navbar.module.css';
import { ReactChild } from 'react';

type Props = {
    navbarContent:ReactChild|ReactChild[],
    onLogout:()=>void
}

const Navbar:React.FC<Props> = ({navbarContent,onLogout}) => {
  return (
    <div className={classes.navbar}>
      {navbarContent}
    </div>
  );
};

export default Navbar;
