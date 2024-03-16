import { createContext, useContext } from "react"

const SocketContext = createContext(null)

const useSocketContext = () => {
    return useContext(SocketContext)
}

export { useSocketContext, SocketContext }
