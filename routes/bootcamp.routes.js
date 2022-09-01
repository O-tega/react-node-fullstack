const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius,  } = require('../controllers/bootcampController')

// Include other resource routes
const courseRouter = require('./courseRoutes.routes');

const router = require('express').Router()

// Re-route to course
router.use('/:bootcampId/courses', courseRouter)


router.get('/', getBootcamps);

// get specific user
router.get('/:id', getBootcamp);
  
// create user
router.post('/', createBootcamp)

// create user
router.put('/:id', updateBootcamp)

// delete user
router.delete('/:id', deleteBootcamp)

// get bootcamps within the same radius
router.get("/radius/:zipcode/:distance", getBootcampsInRadius);


module.exports = router;