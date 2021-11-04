import classes from "./ConversationItem.module.css";

import UserImg from "../UI/UserImg/UserImg";

type Props = {
  conversation: any;
  myUserId: string;
  onSelectConversation: (conversation: any,other:any) => void;
};

const ConversationItem: React.FC<Props> = ({
  conversation,
  myUserId,
  onSelectConversation,
}) => {
  const other =
    conversation.creator._id === myUserId
      ? conversation.withUser
      : conversation.creator;

  const selectConversationHandler = () => {
    onSelectConversation(conversation,other);
  };

  return (
    <div className={classes.conversation}>
      <a
        className={classes["conversation-btn"]}
        onClick={selectConversationHandler}
      >
        <div>
          <UserImg imageUrl={other.imageUrl} />
        </div>
        <div>{other.nickname}</div>
      </a>
    </div>
  );
};

export default ConversationItem;
