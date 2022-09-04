const {
	getCourses,
	createCourse,
	getCourse,
	updateCourse,
	deleteCourse,
} = require("../controllers/courseController");

const advancedResult = require('../middlewares/advancedResult')
const Course = require('../models/Course')

const router =
	require("express").Router({mergeParams: true});

// get all courses, post course
router
	.route("/")
	.get(advancedResult(Course, {
            path: 'bootcamp',
            select: 'name description'
        }), getCourses)
	.post(createCourse);

router
	.route("/:id")
	.get(getCourse)
	.put(updateCourse) 
	.delete(deleteCourse);

module.exports = router;
