const fs = require('fs');
const http = require('http');
const express = require('express');
const colors = require('colors');
const readline = require('readline');
const os = require('os');


const app = express();

app.post('/user/:per', (req,res)=>
{

console.log(req.body);
console.log(req.params);
res.send('recibida')
})

app.all('/user',(req,res,next)=>
{
console.log('klk como estan')

next()
})

app.get('/user',(err,res)=>
{
res.json({
nombre:"odiseo",
apellido:"javier"

})
})

app.delete('/borrar/:id',(req,res)=>
{
res.send(`user borrado ${req.params.id}`);
})


app.listen(3200,()=>
{
console.log('El servidor esta corriendo en el puerto 3200')

})


















