import { ReactChild } from 'react';
import classes from './CardHeader.module.css';

const CardHeader:React.FC<{classNames:string,children:ReactChild|ReactChild[]}> = ({classNames,children}) => {
  return (
    <div className={`${classes["card-header"]} ${classNames}`}>
      {children}
    </div>
  );
};

export default CardHeader;
