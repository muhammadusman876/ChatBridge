import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  //this will basically listen to any incoming messages from the socket
  useListenMessages();
  const lastMessageRef = useRef();

  //ref here help us scroll to the very end
  //so whenever messages changes it will run this useEffect and scroll to very end, setTimeout is a work around as without it scroll doesn't work
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    //so that content can have a scroll bar with OVERFLOW-AUTO
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          //ref here help us scroll to the very end
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
