import ConversationItem from './../ConversationItem/ConversationItem';
import { useCallback, useEffect, useState,useContext } from 'react';
import RequestConfig from '../../types/RequestConfig';
import AuthContext from './../../store/auth-context';
import useHttp from '../../hooks/use-http';
import ConversationContext from './../../store/conversation/conversation-context';

const ConversationList = () => {

    const authCtx = useContext(AuthContext);
    const conversationCtx = useContext(ConversationContext);
    const {conversations,chargeConversations,refreshFlag} = conversationCtx;

    const { isLoading, error, sendRequest } = useHttp(authCtx.authData.token);
  
    const fetchConversations = useCallback(() => {
      const request: RequestConfig = {
        url: "http://localhost:8080/conversation",
        method: "GET",
        body: null,
      };
      sendRequest(
        request,
        (data) => {
          const conversationsFromServer = data.conversations;
          chargeConversations(conversationsFromServer);
        //   setConversations(conversationsFromServer);
          console.log(data);
        },
        () => {
          console.log("error");
        }
      );
      //refreshFlag change after new conversation creation on the application,or load click, don't remove it please:)
    }, [sendRequest,chargeConversations,refreshFlag]);
  
    useEffect(() => {
      fetchConversations();
    }, [fetchConversations]);

    const selectConversationHandler = (conversation:any,other:any) => {
        conversationCtx.selectConversation(conversation);
        conversationCtx.setOther(other);
    }

    
  let result;
  if (isLoading) {
    result = <h3>Loading...</h3>;
  } else if (!conversations || conversations.length === 0) {
    result = <h3>No conversation found</h3>;
  } else if (error) {
    result = <h3>{error}</h3>;
  } else {
    result = (
      <>
        {conversations.map((conversation:any) => (
          <ConversationItem key={conversation._id} conversation={conversation} myUserId={authCtx.authData.userId} onSelectConversation={selectConversationHandler}/>
        ))}
        
      </>
    );
  }

    return <>
        
        {result}
    </>
}

export default ConversationList;