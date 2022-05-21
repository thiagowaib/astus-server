const express = require('express');
const routes = new express.Router();

// ========== Routing ===============
routes.get('/', (req, res)=>{res.send("Hello World")})

// ==================================

module.exports = routes