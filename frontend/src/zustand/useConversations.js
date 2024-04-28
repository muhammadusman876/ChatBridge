import { create } from "zustand";

//this zustand is alternative to ContextAPI

//this create functions will get "set" as an argument 
//this will return an object
const useConversation = create((set) => ({
    //by default it will be null, for this we will have setter function
	selectedConversation: null,
    // this basically like using useState
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    //default this array will be empty
	messages: [],
    //here we will set the array message
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;