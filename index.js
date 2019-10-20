let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

io.on('connection',(socket)=>{
    socket.on('disconnect',function(){
        io.emit('user-changed',{user:socket.username,event:'left'});
    })

    socket.on('set-name',(name)=>{
        socket.username = name;
        io.emit('user-changed',{user:name, event:'joined'})
    })

    socket.on('send-message',(message)=>{
        io.emit('message',{msg:message.txt, user:socket.username, createdAt: new Date()})
    });
});

var port = process.env.PORT || 3001;

server.listen(port,function(){
    console.log("Carry on with your project");
});