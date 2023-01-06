'use strict'

var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema= Schema ({
        name: String,
        description: String,
        category: String,
        year: Number,
        langs: String,
        image: String
});

module.exports= mongoose.model('Project', ProjectSchema) // mongoose cuando guarda lo pone en minuscula y lo pluraliza, osea projects // projects --> guarda los documents en la coleccion      

