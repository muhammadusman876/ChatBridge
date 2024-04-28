// // import { useState } from "react"
// // import { useAuthContext } from "../context/AuthContext";
// // import toast from "react-hot-toast";

// // const useLogout = () => {
// //     //this is our loader
// //     const [loading, setLoading] = useState(false);
// //     const {setAuthUser} = useAuthContext()

// //     const logout = async () => {
// //         setLoading(true)

// //         try {
// //             //here send our request of logging out
// //             const res = await fetch("/api/auth/logout", {
// //                 method: "POST",
// //                 headers: { "Content-Type" : "application/json"},
// //             })
// //             //here we get our data 
// //             const data = await res.json();
// //             // for the error
// //             if (data.error) {
// //                 throw new Error(data.error)
// //             }
// //             //here we remove the Item called chat-user which named in AuthContext 
// //             localStorage.removeItem("chat-user");
// //             //here we set value to null
// //             setAuthUser(null)

// //         } catch (error) {
// //             toast.error(error.message)
// //         }finally {
// //             setLoading(false)
// //         }
// //     }
// //     //return the both of these function
// //     return {loading, logout}
// // }

// // export default useLogout

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;