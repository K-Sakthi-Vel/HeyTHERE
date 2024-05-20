// requring express
const express = require("express");

// require("dotenv").config()

const path = require("path")
// port number for run server
const port = process.env.PORT;
// calling express as function
const app = express();

const __dirname1 = path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'../Client_side/build')))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"Client_side","build","index.html"));
    })
}
else{
    app.get("/",function(req,res){
        res.send("App running Successfully")
    })
}
// requiring http
const http = require('http');
// initializing socket.io as Server
const { Server } = require("socket.io");

// requiring CORS
const cors = require('cors');
// middleware
app.use(cors());
// creating server
const server = http.createServer(app);
// initializing new Server from origin of client side
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});
// connection socket for receive and emitting message and join room
io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });
    
    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    });
});
// let server run
server.listen(port,(err)=>{
    if(err){
        console.log("Error in running server",err)
        return;
    }
    console.log("Server up and running on port number", port)
})
