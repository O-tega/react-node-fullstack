const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User');



// @Descr   Regiater user
// @Route   POST route /api/v1/auth/register
// @access  Public

exports.register = asyncHandler( async (req, res, next)=>{
    const{name, email, password, role} = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    // const token = user.getSignedJwtToken() ..... try to implement jwt from the model

    res.status(200).json({
        success:true,
        token
    })

})


// @Descr   Login user
// @Route   POST route /api/v1/auth/login
// @access  Public

exports.login = asyncHandler( async (req, res, next)=>{

    // validate email & password
    
    const{email, password} = req.body
    const user = await User.findOne({email}).select('+password')

    // check if email and password are provided

    if(!email || !password){
        return next(
            new ErrorResponse(
                'please include an email and password', 400
            )
        )
    }
// Check if user is in the database
    if(!user){
        return next(
            new ErrorResponse(
                `Invalid Credentials`, 401
            )
        )
    } 

// check if password matches
const isMatch = await bcrypt.compare(password, user.password)

if(!isMatch){
     return next(
            new ErrorResponse( 
                'Invalid Credentials', 400
            )
        )
    }

 const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    res.status(200).json({
        success:true,
        token
    })

})