import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { createContext, useState, useEffect, useContext } from "react";

export const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);    
    const {authUser} = useAuthContext()  
    
    useEffect(() => {
        //here if we have a authenticated user
      if (authUser) {
        //then we will create a connection with io method
        const socket = io("http://localhost:8000", {
          //when we are logged in we would like to take userId, for that we that as an argument 
          query: {
             userId : authUser._id
          }
        })

        //once the connection is completed, set the socket to the above connection
        setSocket(socket)

        //socket.on() is used to listen to the events, it can be used both on client and server side
        //once we are connected we would like to see who is connected
        //this will return us users
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users)
        })

        //clean up function, clean our socket once the component is unmounted
        return () => socket.close()
      } else {
        //if there is no authenticated user then we want to close the existing socket connection.
        if (socket) {
          socket.close()
          setSocket(null)
        }
      }
    }, [authUser])
    

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}