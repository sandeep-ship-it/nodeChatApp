var express = require('express')

var bodyParser = require('body-parser')

var app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
var http = require('http').Server(app)
var io = require('socket.io')(http)

var mongoose = require('mongoose')


var message = [
    {name: "Tim", message : "Hi"},
    {name: "Grey", message : "Hmm"}
]
app.get('/messages', (req, res) => {
    res.send(message)
})

app.post('/messages', (req, res) => {
    message.push(req.body)
    io.emit('sandeep', req.body)
    res.sendStatus(200)
})

var server = http.listen(3000, () => {
    console.log("App is listening at port", server.address().port)
})