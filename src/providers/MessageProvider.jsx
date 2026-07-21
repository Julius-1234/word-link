import { useState, createContext, useContext } from "react";
import MessageDisplay from "../components/MessageDisplay/MessageDisplay";

const MessageContext = createContext(null);
export default function MessageProvider({ children }) {
  const messageMax = 5;
  function addMessage(message) {
    setMessages((prev) => [message, ...prev].slice(0, messageMax));
    setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1));
    }, 2000);
  }
  const [messages, setMessages] = useState([]);
  return (
    <MessageContext.Provider value={addMessage}>
      <MessageDisplay data={messages}></MessageDisplay>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
