import { useCallback, useEffect, useState } from "react"
import { useSocketContext } from "../context/SocketContext"

const Room = () => {
    const socket = useSocketContext()
    const [remoteSocketId, setRemoteSocketId] = useState("")

    const handleUserJoin = useCallback(({ emailId, id }) => {
        console.log("user joined", emailId)
        setRemoteSocketId(id)
    }, [])

    useEffect(() => {
        socket.on("user:join", handleUserJoin)
        return () => {
            socket.off("user:join", handleUserJoin)
        }
    }, [socket, handleUserJoin])

    return (
        <div>Room</div>
    )
}

export default Room