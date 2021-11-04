import { ReactChild } from 'react';
import classes from './CardBody.module.css';

const CardBody:React.FC<{classNames?:string,children:ReactChild|ReactChild[]}> = ({classNames,children}) => {
  return (
    <div className={`${classes["card-body"]} ${classNames}`}>
      {children}
    </div>
  );
};

export default CardBody;
