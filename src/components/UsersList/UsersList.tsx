import classes from "./UsersList.module.css";
import Modal from "./../UI/Modal/Modal";
import { useCallback, useState } from "react";
import useHttp from "../../hooks/use-http";
import RequestConfig from "../../types/RequestConfig";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "./../../store/auth-context";
import UserItem from "./../UserItem/UserItem";
import { User } from "./../../types/user";
import ConversationContext from "./../../store/conversation/conversation-context";
type Props = {
  onClose: () => void;
};

const UsersList: React.FC<Props> = ({ onClose }) => {
  const authCtx = useContext(AuthContext);
  const conversationCtx = useContext(ConversationContext);
  const { refreshConversation } = conversationCtx;
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, error, sendRequest } = useHttp(authCtx.authData.token);

  const fetchUsers = useCallback(() => {
    const request: RequestConfig = {
      url: "http://localhost:8080/users",
      method: "GET",
      body: null,
    };
    sendRequest(
      request,
      (data) => {
        const usersFromServer = data.users;
        const usersList = [];
        usersFromServer.forEach((user) => {
          usersList.push(
            new User(
              user._id,
              user.nickname,
              user.email,
              user.imageUrl,
              user.status
            )
          );
        });
        setUsers(usersList);
        console.log(data);
      },
      () => {
        console.log("error");
      }
    );
  }, [sendRequest]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const startConversationWithUser = async (withUserId: number) => {
    const formdata = new FormData();
    formdata.append("withUserId", withUserId.toString());
    const request: RequestConfig = {
      url: "http://localhost:8080/conversation",
      method: "POST",
      body: formdata,
    };
    sendRequest(
      request,
      (data) => {
        refreshConversation();
        alert(data.message);
        onClose();
      },
      (error) => {
        alert("Error, check console");
        console.log(error);
      }
    );
  };

  let result;
  if (isLoading) {
    result = <h3>Loading...</h3>;
  } else if (users.length === 0) {
    result = <h3>No user found</h3>;
  } else if (error) {
    result = <h3>{error}</h3>;
  } else {
    result = (
      <div className={classes["users-list"]}>
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onStartConversation={startConversationWithUser}
          />
        ))}
      </div>
    );
  }

  return (
    <Modal onClose={onClose}>
      {result}
      <div className={classes.actions}>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default UsersList;
