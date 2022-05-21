const express = require('express');
const routes = new express.Router();

// ========== Routing ===============

// * Example CRUD
// const { get, post, put, del } = require('./controllers/example-crud')
// routes.get('/get', get)
// routes.post('/post', post)
// routes.put('/put', put)
// routes.delete('/delete/:email', del)

// * User Controller
const { UserSignUp, UserSignIn, } = require('./controllers/UserController')
routes.post('/UserSignUp', UserSignUp)
routes.post('/UserSignIn', UserSignIn)

// ==================================

module.exports = routes