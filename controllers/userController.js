// @desc    Get all Users
// @route   Get /api/v1/user
// @access  Public
exports.getUsers = (req, res, next)=>{
    res.status(200).json({
			success: true,
			message:
				"You successfully rendered this routes",
		});
}

// @desc    Get single Users
// @route   Get /api/v1/user/:id
// @access  Public
exports.getUser = (req, res, next)=>{
    res.status(200).json({
			success: true,
			message:`get user ${req.params.id}`,
		});
}

// @desc    Create single Users
// @route   POST /api/v1/user
// @access  Public
exports.createUser = (req, res, next)=>{
   res.status(200).json({
			success: true,
			msg: "create new bootcamp",
		});
}

// @desc    Update single Users
// @route   PUT /api/v1/user
// @access  Private
exports.updateUser = (req, res, next)=>{
   res.status(200).json({
			success: true,
			msg: `edit user ${req.params.id}`,
		});
}

// @desc    Delete single Users
// @route   DELETE /api/v1/user
// @access  Private
exports.deleteUser = (req, res, next)=>{
     res.status(200).json({
				success: true,
				msg: `delete user ${req.params.id}`,
			});
}