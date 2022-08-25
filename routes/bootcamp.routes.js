const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp,  } = require('../controllers/userController')

const router = require('express').Router()


router.get('/', getBootcamps);

// get specific user
router.get('/:id', getBootcamp);
  
// create user
router.post('/', createBootcamp)

// create user
router.put('/:id', updateBootcamp)

// delete user
router.delete('/:id', deleteBootcamp)


module.exports = router;