import { createContext } from "react";


type Props ={
    conversations:any[],
    selectedConversation:any,
    selectConversation:(conversation:any)=>void,
    chargeConversations:(conversations:any[])=>void,
    refreshConversation:()=>void,
    refreshFlag:number,
    setOther:(other:any)=>void,
    other:any
}
const ConversationContext = createContext({
    conversations:[],
    selectedConversation:null,
    selectConversation:(conversation:any)=>{},
    chargeConversations:(conversations:any[])=>{},
    refreshConversation:()=>{},
    refreshFlag:0,
    setOther:(other:any)=>{},
    other:null
})

export default ConversationContext;