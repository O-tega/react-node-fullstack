const Course = require('../models/Course')
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require('../utils/errorResponse');



// @Descr   Create course
// @Route   POST route /api/course
// @access  Public
exports.createCourse = asyncHandler(async(req, res, next)=>{
    const course = await Course.create(req.body)
    course.save()

    res.status(200).json({
        success: true,
        data: course
    })
})


// @Descr   GET all courses
// @Route   GET route /api/course
// @access  Public
exports.getCourses = asyncHandler(async(req, res, next)=>{
    const courses = await Course.find()

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

// @Descr   GET single courses
// @Route   GET route /api/course/:id
// @access  Public
exports.getCourse = asyncHandler(async(req, res, next)=>{
    const course = await Course.findById(req.params.id)
    if (!course){
        return next(
            new ErrorResponse(
                `incorrect format: course id not found for ${req.params.id}`, 404
            )
        )

    }
    res.status(200).json({
        success: true,
        data: course
    })
})

// @Descr   UPDATE single courses
// @Route   PUT route /api/course/:id
// @access  Private
exports.updateCourse = asyncHandler(async(req, res, next)=>{
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!course) {
			return next(
				new ErrorResponse(
					`incorrect format: course id not found for ${req.params.id}`, 404
				)
			);
		}
    res.status(200).json({
        success: true,
        data: course
    })
})

// @Descr   DELETE single courses
// @Route   DELETE route /api/course/:id
// @access  Private
exports.deleteCourse = asyncHandler(async(req, res, next)=>{
    const course = await Course.findByIdAndDelete(req.params.id)
    const courses = await Course.find()
    
    if(!course){
        return next(
            new ErrorResponse(
                `Incorrect format: course ID not found for ${req.params.id}`
            )
        )
    }

    res.status(200).json({
        success: true,
        count: courses.length,
        info: `course with ID ${req.params.id} has been deleted`,
        data: courses,
    })
})
