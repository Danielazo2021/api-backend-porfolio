'use strict'

var express= require('express');
const { route } = require('../app'); // ver porque la agrego
var ProjectController = require ('../controllers/project');

var router= express.Router();

var multipart = require ('../node_modules/connect-multiparty');
var multipartMiddleware= multipart({uploadDir: './uploads'});


router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/get-project/:id?', ProjectController.getProject);
router.get('/get-projects', ProjectController.getProjects);
router.put('/update-project/:id', ProjectController.updateProject);
router.delete('/delete-project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports= router;