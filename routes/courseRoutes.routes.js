const {
	getCourses,
	createCourse,
	getCourse,
	updateCourse,
	deleteCourse,
} = require("../controllers/courseController");

const router =
	require("express").Router({mergeParams: true});

// get all courses, post course
router
	.route("/")
	.get(getCourses)
	.post(createCourse);

router
	.route("/:id")
	.get(getCourse)
	.put(updateCourse)
	.delete(deleteCourse);

module.exports = router;
