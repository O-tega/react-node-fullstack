// Import the Bootcamp model
const Bootcamp = require('../models/Bootcamp')
// import error class
const ErrorResponse = require('../utils/errorResponse')
// import asyncHandler and wrap all async calls with the asyncHandler
const asyncHandler = require('../middlewares/async')
// import geocoder
const geocoder = require('../utils/geocoder')
const { query } = require('express')


// @desc    Get all Users
// @route   Get /api/v1/bootcamp
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next)=>{
	console.log(req.query)

	let query;

	// copy req.query
	let reqQuery = {...req.query}

	// Fields to exclude
	const removeFields = ['select', 'sort']

	// loop over removed fields and delete them
	removeFields.forEach(param => delete reqQuery[param])

	console.log(reqQuery)

	// Create query string
	let queryStr = JSON.stringify(reqQuery)

	// Create operators like gt, gte etc
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`);

	// Finding resourse
	query = Bootcamp.find(JSON.parse(queryStr))

	// Select fields
	if(req.query.select){
		const fields = req.query.select.split(',').join(' ')
		query = query.select(fields);
	}

	// Sort fields
	if(req.query.sort){
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy)
	}else{
		query = query.sort('-createdAt'); 
	}


	// Exectuing query
		const bootcamps = await query;
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


// @desc    Get bootcamps within a radius
// @route   DELETE /api/v1/bootcamp/:zipCode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler( async (req, res, next)=>{
	// pull out zipcode and distance from the url
	const {zipcode, distance} = req.params;

	// Get lng/lat from geocoder
	const loc = await geocoder.geocode(zipcode)
	const lat = loc[0].latitude;
	const lng = loc[0].longitude; 

	// calc the radius using radians
	// Divide distance by radius of the earth
	// Earth radius = 3,963 mi / 6,378 km
 
	const radius = distance / 3963;

	const bootcamps = await Bootcamp.find({
		location: {$geoWithin: { $centerSphere: [ [ lng, lat ], radius ]}}
	})

	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps
	})
})