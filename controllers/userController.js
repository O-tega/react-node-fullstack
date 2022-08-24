// Import the User model
const User = require('../models/User')
// import error class
const ErrorResponse = require('../utils/errorResponse')


// @desc    Get all Users
// @route   Get /api/v1/user
// @access  Public
exports.getUsers = async (req, res, next)=>{
	try{
		const users = await User.find();
		res.status(200).json({
				success: true,
				count: users.length,
				data: users
			});
	}catch(err){
		next(err)
	}
}
  
// @desc    Get single Users
// @route   Get /api/v1/user/:id
// @access  Public
exports.getUser = async (req, res, next)=>{
	try{
		const user = await User.findById(
			req.params.id
		);
		// if ID is not formatted correctly
		if (!user) {
			return next(
				new ErrorResponse(
					`Incorrect format: User not found for the ID ${req.params.id}`,
					404
				)
			);
		}
			
		res.status(200).json({
			success: true,
			data: user,
			});
		
	}catch(err){
		// res.status(400).json({
		// 	success: false,
		// 	Error: err
		// })

		// Using Error class
		next(err)
}
}
// @desc    Create single Users
// @route   POST /api/v1/user
// @access  Public
exports.createUser = async (req, res, next)=>{
	try{
		const user = await User.create(req.body);

		res.status(201).json({
			success: true,
			data: user
		})
	}catch(err){
		next(err)
	}

}

// @desc    Update single Users
// @route   PUT /api/v1/user
// @access  Private
exports.updateUser = async (req, res, next)=>{
	try{
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		// check if userID exist
		if (!user){
			return next(
				new ErrorResponse(
					`Incorrect format: User not found for the ID ${req.params.id}`,
					404
				)
			);
		}
		res.status(200).json({
			success : true,
			data: user
		})

	}catch(err){
		next(err)
	}
}

// @desc    Delete single Users
// @route   DELETE /api/v1/user
// @access  Private
exports.deleteUser = async (req, res, next)=>{
	try{
		const user = await User.findById(req.params.id);
		if(!user){
			return next(
				new ErrorResponse(
					`Incorrect format: User not found for the ID ${req.params.id}`,
					404
				)
			);
		}

		await User.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			msg: "User is deleted"
		})

	}catch(err){
		next(err)
	}
}