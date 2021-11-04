import { ReactChild,useCallback,useState } from "react";

import ConversationContext from './conversation-context';

const ConversationProvider: React.FC<{ children: ReactChild | ReactChild[] }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState([]);
    const [selectedConversation,setSelectedConversation] = useState(null);
    const [refreshFlagCounter,setRefreshFlagCounter] = useState(0);
    const [other,setOther] = useState(null);
  const selectConversationHandler = (conversation:any) => {
    setSelectedConversation(conversation);
  }

  const chargeConversationsHandler = useCallback((conversations) => {
      setConversations(conversations);
  },[])

  const refreshConversation = () =>{
      setRefreshFlagCounter(last=>last+1);
  }

  const setOtherHandler = (other:any) => {
    setOther(other);
  }

  const conversationValue = {
    conversations:conversations,
    selectedConversation:selectedConversation,
    selectConversation:selectConversationHandler,
    chargeConversations:chargeConversationsHandler,
    refreshConversation:refreshConversation,
    refreshFlag:refreshFlagCounter,
    setOther: setOtherHandler,
    other:other
  };

  return (
    <ConversationContext.Provider value={conversationValue}>{children}</ConversationContext.Provider>
  );
};

export default ConversationProvider;
