import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversations";
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
  //here we will check if the is from us or the other user
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  //we populated senderId & receiverId in the backend thats what we are using here.
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  //if from me the text is on right and or else to the left
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  //if the message is from the then profile pic would be mine or else the profile pic would be the conversation you have selected
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-300" : "";
  //this is for incoming messages
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white  ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
