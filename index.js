const express=require('express')
const cors=require('cors')
const http=require('http');
const {Server} =require('socket.io')
const app=express()
app.use(cors())
app.use(express.json())
// creating server 
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'*',
        method:['GET','POST']
    }
})
io.on("connection",(socket)=>{
     console.log("client connected");
     socket.on("join_room",(id)=>{
        socket.join(id);
        console.log("User joined in room");
        console.log("User with ID ",socket.id," and room id->",id)
     })
     socket.on("send_message",(data)=>{
        socket.to(data.roomid).emit("receive_message",data);
     })
     socket.on('disconnect',()=>{
        console.log("User disconnected")
     })
})

server.listen(9000,()=>console.log("Socket server running..."))