'use strict'
const { restart } = require('nodemon');
const project = require('../models/project');
var Project= require('../models/project');
var fs =require('fs');
const { exists } = require('../models/project');
var path =require('path');

var controller= {
    home: function(req, res){
        return res.status(200).send({
            message:'soy la home'
        });
    },
    test: function (req, res){
        return res.status(200).send({
            message:"soy el metodo o accion test del controlador de project"
        });
    },
    saveProject: function(req, res){
        var project= new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'error al guardar el documento'});

            if(!projectStored) return res.status(404).send({message: ' no se ha podido guardar el proyecto'});
            return res.status(200).send({project: projectStored});
        });

    },

    getProject: function(req,res){
        var projectId= req.params.id;

        if(projectId== null){
            return res.status(404).send({message: ' el proyecto no existe'});
        }

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: 'error al devolver el documento'});

            if(!project) return res.status(404).send({message: ' el proyecto no existe'});
            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function(req, res){
    Project.find({}).sort('year').exec((err, projects)=>{
        if(err) return res.status(500).send({message: 'error al devolver los datos'});

        if(!projects) return res.status(404).send({message: ' no hay proyectos para mostrar'});

        return res.status(200).send({
            projects
        });
    });
    
    },
    updateProject: function(req, res){
        var projectId= req.params.id;
        var update= req.body;

        Project.findByIdAndUpdate(projectId, update,{new:true}, (err, projectUpdate)=>{
            if(err) return res.status(500).send({message: 'error al actualizar los datos'});

        if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

        return res.status(200).send({
            project: projectUpdate,
            message:'actualizado'
        });

        });
    },
    deleteProject:function(req, res){
        var projectId= req.params.id;
       
        Project.findByIdAndDelete(projectId, (err, projectRemoved)=>{
            if(err) return res.status(500).send({message: 'error al borrar los datos'});

        if(!projectRemoved) return res.status(404).send({message: 'No existe el proyecto para borrar'});

        return res.status(200).send({

            project: projectRemoved,

            message:'documento borrado'
            
        });

        });

    },
    uploadImage: function(req, res){
        var projectId= req.params.id;        
        var fileName= 'imagen no subida...';
        
        if(req.files){
            var filePath= req.files.image.path;
            var fileSplit= filePath.split('\\');
            var fileName= fileSplit[1];
            var extSplit= fileName.split('\.');
            var fileExt= extSplit[1];

            if(fileExt=='png' || fileExt=='jfif' || fileExt== 'jpg' || fileExt=='jpeg'|| fileExt=='gif'){

            Project.findByIdAndUpdate(projectId, {image: fileName},{new:true} ,(err,projectUpdate)=>{
                if(err) return res.status(500).send({message: 'error al subirla imagen'});

        if(!projectUpdate) return res.status(404).send({message: 'el proyecto no existe, no se puede subir esa imagen ahi'});

        return res.status(200).send({
            project: projectUpdate,
            message:'Imagen Subida'
                });
            });            
        }else{

        fs.unlink(filePath,(err)=>{
            return res.status(200).send({message: "la extencion no es valida"});
        });
        }

        } else{
            return res.status(200).send({               
            message: fileName
                });
        }        
    },

        getImageFile:function(req,res){
            var file=req.params.image;
            var path_file= './uploads/'+ file;

            fs.exists(path_file, (exists)=>{
                if (exists){
                    return res.sendFile(path.resolve(path_file))
                }else{
                    return res.status(200).send({
                        message:"No existe la Imagen.."
                    });
                }
            });
        }


}
module.exports= controller;

