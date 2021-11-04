import classes from "./ConnectedUser.module.css";
import UserImg from './../UI/UserImg/UserImg';
import { useContext } from 'react';
import ConversationContext from './../../store/conversation/conversation-context';

const ConnectedUser = ({authData}) => {

  const conversationCtx = useContext(ConversationContext);

  const reloadConversations = () => {
    conversationCtx.refreshConversation();
  }
  return (
    <>
      <UserImg imageUrl={authData.imageUrl}/>
      <div>
          <span className={classes.userNickname}>{authData.nickname} | </span>
          <span className={classes.load} onClick={reloadConversations}>Load</span>
 
      </div>
    </>
  );
};

export default ConnectedUser;
