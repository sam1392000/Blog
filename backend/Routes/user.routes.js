const express = require('express');
const {signUp,login} = require('../Controllers/User.controller')
const router = express.Router();
const {check , validationResult} = require('express-validator')

router.post('/signup',[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
],signUp);
router.post('/login',[
    check('email','Email is necessary...').isEmail(),
    check('password',"Password is necessary").isLength({min:3})
],login)

module.exports = router;