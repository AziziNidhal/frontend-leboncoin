import { useRef } from "react";
import classes from "./Compose.module.css";
const Compose:React.FC<{onSendMessage:(content:string)=>void,onRefreshMessages:()=>void}> = ({onSendMessage,onRefreshMessages}) => {

  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);


  const submitMessage = (event:React.FormEvent) => {
    event.preventDefault();
    const messageContent = messageTextareaRef.current.value;
    if(messageContent && messageContent.trim().length > 0){
      onSendMessage(messageContent)
      //only this one :( , i know its not a good practice, the next time, i will use useState for controlled fields
      messageTextareaRef.current.value = '';
    }
  }

  const refreshMessages = (event:React.MouseEvent) => {
    event.preventDefault();
    onRefreshMessages();
  }
  return (
    <div className={classes.compose}>
      <form action="" onSubmit={submitMessage}>
        <textarea name="" id="" rows={1} placeholder="Type Here..." ref={messageTextareaRef}></textarea>
        <button type="submit">Send</button>
        <button onClick={refreshMessages}>refresh</button>
      </form>
    </div>
  );
};

export default Compose;
