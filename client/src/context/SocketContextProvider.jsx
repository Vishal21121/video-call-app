import { useMemo } from "react";
import { io } from "socket.io-client"
import { SocketContext } from "./SocketContext.js"


// eslint-disable-next-line react/prop-types
const SocketContextProvider = ({ children }) => {
    const socket = useMemo(() => io("localhost:8080"), [])
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}

export default SocketContextProvider

