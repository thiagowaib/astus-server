const express = require('express');
const routes = new express.Router();

// ========== Routing ===============

// * Example CRUD
const { get, post, put, del } = require('./controllers/example-crud')
routes.get('/get', get)
routes.post('/post', post)
routes.put('/put', put)
routes.delete('/delete/:email', del)

// * User Controller
const { UserSignUp, UserSignIn, } = require('./controllers/UserController')
routes.post('/user/signup', UserSignUp)
routes.post('/user/signin', UserSignIn)

// * Test Authentication
const { AuthAccessToken, } = require("./middlewares")
// Remember to set in Request Headers a field named 
// "authorization" set to the value of the jwt.
routes.get('/auth/test', AuthAccessToken, (req, res)=>{
    res.send({
        Description: "JWT Validated",
        Name: req.payload.name,
        Email: req.payload.email,
    }).status(200)
})
// ==================================

module.exports = routes