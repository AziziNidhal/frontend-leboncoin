import classes from "./UserItem.module.css";
import UserImg from "./../UI/UserImg/UserImg";

const UserItem: React.FC<{
  onStartConversation: (_id: number) => void;
  user: any;
}> = ({ onStartConversation, user }) => {
  const startConversationHandler = async (userId: number) => {
    onStartConversation(userId);
  };

  return (
    <div className={classes.userItem}>
      <div className={classes["userItem-element"]}>
        <div>
          <UserImg imageUrl={user.imageUrl} />
        </div>
        <div>
          {user.nickname} ({user.status})
        </div>
        <button onClick={startConversationHandler.bind(null, user._id)}>
          Start
        </button>
      </div>
    </div>
  );
};

export default UserItem;
