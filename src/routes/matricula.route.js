const { Router } = require('express') 
const { auth } = require('../middleware/auth')

const MatriculaController = require('../controllers/MatriculaController')
const matriculaRoutes = new Router()

matriculaRoutes.use(auth)

matriculaRoutes.post('/', MatriculaController.cadastrar)
matriculaRoutes.get('/', MatriculaController.listarTodos)
matriculaRoutes.get('/:id', MatriculaController.listarUm)

module.exports = matriculaRoutes