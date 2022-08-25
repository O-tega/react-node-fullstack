// Import the Bootcamp model
const Bootcamp = require('../models/Bootcamp')
// import error class
const ErrorResponse = require('../utils/errorResponse')
// import asyncHandler and wrap all async calls with the asyncHandler
const asyncHandler = require('../middlewares/async')


// @desc    Get all Users
// @route   Get /api/v1/bootcamp
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next)=>{
		const bootcamps = await Bootcamp.find();
		res.status(200).json({
				success: true,
				count: bootcamps.length,
				data: bootcamps
			});
})
  
// @desc    Get single Users
// @route   Get /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = asyncHandler( async (req, res, next)=>{
		const bootcamp = await Bootcamp.findById(
			req.params.id
		);
		// if ID is not formatted correctly
		if (!bootcamp) {
			return next(
				new ErrorResponse(
					`Incorrect format: Bootcamp not found for the ID ${req.params.id}`,
					404
				)
			);
		}
			
		res.status(200).json({
			success: true, 
			data: bootcamp,
			});
})
// @desc    Create single Users
// @route   POST /api/v1/bootcamp
// @access  Public
exports.createBootcamp = asyncHandler( async (req, res, next)=>{
		const bootcamp = await Bootcamp.create(req.body);

		res.status(201).json({
			success: true,
			data: bootcamp
		})
})

// @desc    Update single Users
// @route   PUT /api/v1/bootcamp
// @access  Private
exports.updateBootcamp = asyncHandler( async (req, res, next)=>{
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		// check if userID exist
		if (!bootcamp){
			return next(
				new ErrorResponse(
					`Incorrect format: Bootcamp not found for the ID ${req.params.id}`,
					404
				)
			);
		}
		res.status(200).json({
			success : true,
			data: bootcamp
		});
})

// @desc    Delete single Users
// @route   DELETE /api/v1/bootcamp
// @access  Private
exports.deleteBootcamp = asyncHandler( async (req, res, next)=>{
		const bootcamp = await Bootcamp.findById(req.params.id);
		if(!bootcamp){
			return next(
				new ErrorResponse(
					`Incorrect format: Bootcamp not found for the ID ${req.params.id}`,
					404
				)
			);
		}

		await Bootcamp.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			msg: "Bootcamp is deleted"
		});
})