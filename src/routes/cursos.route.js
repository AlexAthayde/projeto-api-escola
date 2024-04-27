const { Router } = require("express")
const { auth } = require("../middleware/auth")

const CursoController = require("../controllers/CursoController")
const cursoRoutes = new Router()

cursoRoutes.use(auth)

cursoRoutes.post("/", CursoController.cadastrar)
cursoRoutes.get("/", CursoController.listarTodos)
cursoRoutes.get('/:id', CursoController.listarUm)
cursoRoutes.put("/:id", CursoController.alterar)
cursoRoutes.delete("/:id", CursoController.excluir)

module.exports = cursoRoutes
