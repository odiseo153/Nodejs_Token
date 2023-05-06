const fs = require('fs');
const http = require('http');
const express = require('express');
const colors = require('colors');
const readline = require('readline');
const morgan = require('morgan');
const os = require('os');
const token = require('jsonwebtoken');


const app = express();

//middlewares
app.set('puerto',3000)
app.set('view engine','ejs')
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended:false }))



function logger(req,res,next)
{
const ruta =`Ruta: ${req.protocol}://${req.get('host')}${req.originalUrl}`
//console.log(ruta)
  
next()  
}

app.use(logger)




app.get('/',validarToken,(err,res)=>
{
  fs.readFile('./Pelis.json',(err,req)=>
   {

     let data = JSON.parse(req);

     res.send(data)
   })
})

app.post('/buscar/:id', validarToken, (req, res) => {
  fs.readFile('./Pelis.json', (err, re) => {
  if(err)
  {
      res.send(err);
      res.status(500).json({
      Message:'internal server error',
      ErrorDescription:err
      })
   }

const bio = { 
Name:'odiseo esmerlin rincon sanchez',
Number:'8297890766',
Nationality:
{
Country:'Dominican Republic',
City:'Santo domingo'
}
}

let data = JSON.parse(re)
const buscar = data.find(e=>e.id == req.params.id)

if(buscar) {
res.send(buscar)
}
else
{
res.status(404).send('we cant find a movie with that ID')
}




  });
});




app.post('/token',(req,res)=>
{


    const data = req.body;
    const userToken = token.sign(data,'odiseo',{expiresIn:3000})

    res.header('authorization',userToken).json
      ({
        message:'Usuario permitido',
 
        token:userToken
      })

})

function validarToken(req,res,next)
{
const ElToken = req.headers['authorization']

if(!ElToken){res.send(`Acceso denegado debe de tener un token 
para tener un token haga un post a http://localhost:3000/token 
`)}

token.verify(ElToken,'odiseo',(err,red)=>
{
if(err)
{
res.send('Acesso denegado token expirado o incorrecto')
}
else
{
 next()
}

 
})               
 
}

app.post('/ver',validarToken,(req,res)=>
{

res.send(req.body.nombre)
})


app.listen(app.get('puerto'),()=>
{
console.clear() 
console.log('El servidor esta corriendo en el puerto:  http://localhost:3000/',app.get('puerto'));

})






