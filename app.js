const path = require('path');
const PORT=4444;
const express=require('express')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')))

let userMap=[];

io.on('connection', (socket) => {
    socket.emit("loggedIn","LoggedIn");
    socket.on("msg",(msg)=>{
        // console.log(msg)
        
        io.emit('reply',{
            msg,
            senderId:userMap[socket.id]
        })
    })
    socket.on("signup",(msg)=>{
        userMap[socket.id]=msg.username;
    })
    socket.on('room',(room)=>{
        console.log(room);
        socket.join(room)
    })
    socket.on('msg1',(msg)=>{
        io.to(room).emit('reply',{
            msg,
            senderId:userMap[socket.id]
        })
    })
});


server.listen(PORT,()=>{
    console.log("http://localhost:"+PORT)
});