import classes from "./MessageContainer.module.css";
import UserImg from './../UI/UserImg/UserImg';

const MessageContainer:React.FC<{position:string,imageUrl:string,messageContent:string}> = ({position,imageUrl,messageContent}) => {
  const positionClass = position==='sent'?classes.sent:classes.received;
  
    return (
    <div className={`${classes["message-container"]} ${positionClass}`}>
      <UserImg imageUrl={imageUrl}/>
      <div className={classes.message}>
        <p>
          {messageContent}
        </p>
      </div>
    </div>
  );
};

export default MessageContainer;
