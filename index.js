'use strict'

 var http=require('http').createServer(server),
    fs=require('fs'),
    io=require('socket.io')(http),
    conexion=0;

 function server(req,res){
    fs.readFile('index.html',(err,data)=>{
        if(err){
            res.writeHead(500,{'content-type':'text/html'})
            return res.end('<h1>Error Iterno del servidor</h1>')
        }
        else{
            res.writeHead(200,{'content-type':'text/html'})
            return res.end(data,'utf-8')
        }
    })
 }

 http.listen(3000)
 console.log("Servidor Corriendo en el puerto 3000")


 io.on('connection', (socket) => {
    socket.emit('hello',{
        message: 'Hola mundo con socket.io'
    })
    socket.on('datosUser',(data)=>{
        console.log(data)
    })
    conexion++

    console.log(`conexiones activas: ${conexion}`)

    socket.emit("online",{numbers : conexion})
    socket.broadcast.emit("online",{numbers : conexion})

    socket.on('disconnect',()=>{
        conexion --
        console.log(`conexiones activas: ${conexion}`)
        socket.broadcast.emit("online",{numbers : conexion})

    })
 })
