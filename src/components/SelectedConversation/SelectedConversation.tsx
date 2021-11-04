import classes from "./SelectedConversation.module.css";
import Compose from "./../Compose/Compose";
import { AuthData } from "./../../types/AuthData";
import MessageContainer from "./../MessageContainer/MessageContainer";
import Card from "../UI/Card/Card";
import CardHeader from "./../UI/Card/CardHeader/CardHeader";
import { useCallback, useContext, useEffect, useState } from "react";
import ConversationContext from "./../../store/conversation/conversation-context";
import UserImg from "./../UI/UserImg/UserImg";
import useHttp from "../../hooks/use-http";
import RequestConfig from "../../types/RequestConfig";

const SelectedConversation: React.FC<{ authData: AuthData }> = ({
  authData,
}) => {
  const { sendRequest, isLoading, error } = useHttp(authData.token);
    const [messages,setMessages] = useState([]);
  const conversationCtx = useContext(ConversationContext);
  const { selectedConversation } = conversationCtx;
  let { other } = conversationCtx;

  const sendMessageHandler = (content: string) => {
    if (other && selectedConversation) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("receiverId", other._id);

      const requestConfig: RequestConfig = {
        url: "http://localhost:8080/message",
        method: "POST",
        body: formData,
      };
      sendRequest(
        requestConfig,
        (res) => {
            fetchMessages();
        },
        (statusCode) => {
          console.log(statusCode);
        }
      );
    }
  };
  if (!other) {
    other = { nickname: authData.nickname, imageUrl: authData.imageUrl };
  }


  const fetchMessages = useCallback(() => {
      
    const request: RequestConfig = {
      url: `http://localhost:8080/message/${selectedConversation._id}`,
      method: "GET",
      body: null,
    };
    sendRequest(
      request,
      (data) => {
        //const conversationsFromServer = data.conversations;
        //chargeConversations(conversationsFromServer);
      //   setConversations(conversationsFromServer);
      setMessages(data)
        console.log(data);
      },
      () => {
        console.log("error");
      }
    );
    //refreshFlag change after new conversation creation on the application,or load click, don't remove it please:)
  }, [sendRequest,selectedConversation]);

    useEffect(() => {
        if(selectedConversation){
            fetchMessages();
        }
      }, [fetchMessages,selectedConversation]);


    const     result = (
        <>
          {messages.map((message:any) => (
            <MessageContainer
            key={message._id}
            position={(message.sender._id === authData.userId)?"sent":"received"}
            imageUrl={(message.sender._id === authData.userId)?authData.imageUrl:message.sender.imageUrl}
            messageContent={message.content}
          />
          ))}
          
        </>
      );

  return (
    <>
      <Card>
        {/* <p>{JSON.stringify(selectedConversation)}</p> */}
        <CardHeader classNames={classes["bg-info"]}>
          <UserImg imageUrl={other.imageUrl} />
          <p>{other.nickname}</p>
        </CardHeader>
        <div className={`${classes["card-body "]} ${classes["msg-body"]}`}>
          {result}

        </div>
        {(authData.nickname !== other.nickname) &&<Compose onSendMessage={sendMessageHandler} onRefreshMessages={fetchMessages} />}
      </Card>
    </>
  );
};

export default SelectedConversation;
