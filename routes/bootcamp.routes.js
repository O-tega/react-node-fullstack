const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload,  } = require('../controllers/bootcampController')

// Include other resource routes
const courseRouter = require('./courseRoutes.routes');

const advancedResult = require('../middlewares/advancedResult');
const Bootcamp = require('../models/Bootcamp');

const router = require('express').Router()

// Re-route to course
router.use('/:bootcampId/courses', courseRouter)


router.get('/', advancedResult(Bootcamp, 'courses'), getBootcamps);

// get specific user
router.get('/:id', getBootcamp);
  
// create user
router.post('/', createBootcamp)

// create user
router.put('/:id', updateBootcamp)

// Upload photo
router.put('/:id/photo', bootcampPhotoUpload);

// delete user
router.delete('/:id', deleteBootcamp)

// get bootcamps within the same radius
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);


module.exports = router;