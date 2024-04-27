const { Router } = require('express')

const LoginControllers = require('../controllers/LoginController')
const loginRoutes = new Router()

loginRoutes.post('/', LoginControllers.login )

module.exports = loginRoutes