// import { useEffect, useState } from "react"
// import toast from "react-hot-toast"

// const useGetConversations = () => {
//     const [loading, setLoading] = useState(false)
//     const [conversations, setConversation] = useState([])

//     //this runs once thats why we have put empty array as dependencies
//     useEffect(() => {
//         const getConversations = async () => {
//             setLoading(true)
//             try {
//                 const res = await fetch('/api/users')
//                 const data = await res.json()
//                 if (data.error) {
//                     throw new Error(data.error)
//                 }
//                 setConversation(data)
//             } catch (error) {
//                 toast.error(error.message)
//             }finally {
//                 setLoading(false)
//             }
//         }

//         getConversations()
//     }, [])

//     return {loading, conversations}
// }

// export default useGetConversations

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/all");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;