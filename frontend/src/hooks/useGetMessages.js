import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversations'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
                
            } catch (error) {
                toast.error(error.message)
            }finally {
                setLoading(false)
            }
        }
        //as this selectedConversation could be null and can cause our application to break so we optional chaining
        if (selectedConversation?._id) {
            getMessages()
        }
        //here whenever selectedConversation changes just run this effect,setMessages never change but it still wants it
    },[selectedConversation?._id, setMessages])


  return { messages, loading }
}

export default useGetMessages