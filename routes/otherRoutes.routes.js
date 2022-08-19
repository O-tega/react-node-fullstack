const router = require('express').Router();


router.get('/current_user', (req, res)=>{
    res.send({message: "this is a new query",
    body:req.user})
})


module.exports = router;