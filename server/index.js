import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: '*',
    }
})

const G = 9.80665 

io.on("connection", socket => {
    console.log(`New client joined with id ${socket.id}`)

    socket.on('sent', (data) => {
       console.log(data)
    })
})
