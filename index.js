'use strict'

var mongoose= require('mongoose');
var app= require('./app');
var port = 3700; // no se porque de donde lo saco // yo lo asigno
const cors = require("cors");

app.use(cors());


mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(()=>{
        console.log("conexión  a la base de datos satisfactoriamente..");

        //creacion del servidor
        app.listen(port, ()=> {
            console.log("servidor corriendo correctamente en la url: localhost:3700 ");
        });


    })
    .catch(err=> console.log(err));


