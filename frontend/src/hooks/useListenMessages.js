import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";
import useConversation from "../zustand/useConversations";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  //this is from zustand global state
  const { messages, setMessages } = useConversation();

  //here we will listen to the event
  useEffect(() => {
    //optional chaining so that our APP doesn't crash
    //here we will take newMessage as an argument
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      //here we set all old messages and then newMessages at the end
      setMessages([...messages, newMessage]);
    });
    //when our component unmounts we don't it to listen to messages
    //if we don't use this clean up function, we will listen to notification sound to the number of listeners we have
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
