const { getUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/userController')

const router = require('express').Router()


router.get('/', getUsers);

// get specific user
router.get('/:id', getUser);

// create user
router.post('/', createUser)

// create user
router.put('/:id', updateUser)

// delete user
router.delete('/:id', deleteUser)


module.exports = router;