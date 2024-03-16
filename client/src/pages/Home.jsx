import { useCallback, useEffect, useState } from "react"
import call from "../assets/call.svg"
import { v4 as uuidv4 } from 'uuid';
import { useSocketContext } from "../context/SocketContext"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [emailId, setEmailId] = useState("")
    const [meetId, setMeetId] = useState("")
    const socket = useSocketContext()
    const navigate = useNavigate()

    const handleNewMeeting = useCallback(() => {
        let roomId = uuidv4()
        socket.emit("room:join", { emailId, roomId })
    }, [emailId, socket])

    const handleRoomJoin = useCallback(({ roomId }) => {
        navigate(`/room/${roomId}`)
    }, [navigate])

    const handleMeetingJoin = useCallback(() => {
        socket.emit("room:join", { emailId, roomId: meetId })
    }, [emailId, meetId, socket])

    useEffect(() => {
        socket.on("room:join", handleRoomJoin)
        return () => {
            socket.off("room:join", handleRoomJoin)
        }
    }, [handleRoomJoin, socket])

    return (
        <div className="flex ">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-bold mb-8">Video call and meeting for everyone!</h1>
                        <div className="w-[30%]">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="gap-4 flex">
                            <button className="btn btn-primary" onClick={handleNewMeeting}>New meeting</button>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Enter meeting code" className="input input-bordered w-full max-w-xs"
                                    value={meetId} onChange={(e) => setMeetId(e.target.value)} />
                                <button className="btn btn-primary" onClick={handleMeetingJoin}>Join meeting</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div>
                <img src={call} alt="" />
            </div>
        </div>

    )
}

export default Home