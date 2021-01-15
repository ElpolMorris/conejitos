const express = require("express");
const fs = require('fs')
const app = express();

app.listen(3000, () => console.log("servidor funcionando en localhost:3000"));

app.use(express.static("assets"))

app.get("/abracadabra/usuarios", (req,res)=>{
    res.sendFile(__dirname + '/nombres.json')
})

app.use("/abracadabra/juego/:usuario", (req,res,next)=>{
    const {usuario} = req.params
    const {nombres} = JSON.parse(fs.readFileSync('nombres.json','utf8'))
    const busqueda = nombres.some(nombre => nombre == usuario)
    busqueda? next() : res.sendFile(__dirname + '/assets/who.jpeg')
})
app.get("/abracadabra/juego/:usuario", (req,res)=>{
    res.sendFile(__dirname + '/assets/index.html')
})
app.use("/abracadabra/conejo/:n", (req,res,next)=>{
    const n = parseInt(req.params.n)
    let aleatorio = Math.floor(Math.random()*(5-1)+1)
    console.log(n, 'aleatorio: ',aleatorio)
    n === aleatorio ? next() : res.sendFile(__dirname + '/assets/voldemort.jpg')
})
app.get("/abracadabra/conejo/:n", (req,res)=>{
    res.sendFile(__dirname + '/assets/conejito.jpg')
})
app.get("*", (req,res)=>{
    res.send('No existe esta página')
})