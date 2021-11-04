import { Fragment, ReactChild } from "react";

import classes from "./Modal.module.css";

type BackdropProps = {
    onClose:()=>void,
}

const Backdrop:React.FC<BackdropProps> = ({onClose}) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay:React.FC<{children:ReactChild|ReactChild[]}> = ({children}) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};


type ModalProps = {
    onClose:()=>void,
    children:ReactChild|ReactChild[]
}

const Modal:React.FC<ModalProps> = ({onClose,children}) => {
  return (
    <Fragment>
        <Backdrop onClose={onClose} />
        <ModalOverlay>{children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
