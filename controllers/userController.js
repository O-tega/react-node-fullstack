// Import the User model
const User = require('../models/User')


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
		res.status(400).json({
			success: false,
			Error: err
		})
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
			return res.status(400).json({
				success: false,
				msg: "incorrect userID",
			});
		}
			
		res.status(200).json({
			success: true,
			data: user,
			});
		
	}catch(err){
		res.status(400).json({
			success: false,
			Error: err
		})
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
		res.status(400).json({
			success: false,
			Error : err
		})
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
			return res.status(400).json({
				success: false,
				msg: "userID does not exist"
			})
		}
		res.status(200).json({
			success : true,
			data: user
		})

	}catch(err){
		res.status(400).json({
			success: false,
			Error: err
		})
	}
}

// @desc    Delete single Users
// @route   DELETE /api/v1/user
// @access  Private
exports.deleteUser = async (req, res, next)=>{
	try{
		const user = await User.findById(req.params.id);
		if(!user){
			return res.status(400).json({
				success: false,
				msg: "User not found"
			})
		}

		await User.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			msg: "User is deleted"
		})

	}catch(err){
		res.status(400).json({
			success: false,
			Error: err
		})
	}
}