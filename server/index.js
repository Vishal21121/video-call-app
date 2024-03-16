import { Server } from "socket.io";
import doetenv from "dotenv"

doetenv.config()

const io = new Server(process.env.PORT, {
    cors: true
})

const emailToSocketMapping = new Map()
const socketToEmailMapping = new Map()


io.on("connection", (socket) => {
    console.log("connected: ", socket.id)
    socket.on("room:join", ({ emailId, roomId }) => {
        emailToSocketMapping.set(emailId, socket.id)
        socketToEmailMapping.set(socket.id, emailId)
        console.log("join room rquest: ", emailId, roomId)
        io.to(roomId).emit("user:join", { emailId, id: socket.id })
        socket.join(roomId)
        io.to(socket.id).emit("room:join", { emailId, roomId })
    })
})