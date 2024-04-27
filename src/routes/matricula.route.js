const { Router } = require('express') 
const { auth } = require('../middleware/auth')

const MatriculaController = require('../controllers/MatriculaController')
const matriculaRoutes = new Router()

matriculaRoutes.post('/', auth, MatriculaController.cadastrar)
matriculaRoutes.get('/', auth, MatriculaController.listarTodos)
matriculaRoutes.get('/:id', auth, MatriculaController.listarUm)

module.exports = matriculaRoutes