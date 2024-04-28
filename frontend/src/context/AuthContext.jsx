// import { createContext, useContext, useState } from "react";

// //CamelCase used here

// export const AuthContext = createContext();

// //in order to consume the below value we use this hook
// export const useAuthContext = () => {
//     return useContext(AuthContext)
// }

// //inside this provider we will provide some value which we can use in our entire application
// //this will take children as a prop
// export const AuthContextProvider = ({children}) => {

//     //this localstorage will return as string but we want to have it as a object so parse it
//     //the name of he getItem here could be anything
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)

//     // basically here we are wrapping our entire application in this authcontext provider
//     return <AuthContext.Provider value={{authUser, setAuthUser}}>
//         {children}
//     </AuthContext.Provider>
// }

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};