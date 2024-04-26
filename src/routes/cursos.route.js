const { Router } = require("express")
const { auth } = require("../middleware/auth")

const CursoController = require("../controllers/CursoController")
const cursoRoutes = new Router()

cursoRoutes.get("/", auth, CursoController.listarTodos)
cursoRoutes.post("/", auth, CursoController.cadastrar)
cursoRoutes.put("/:id", auth, CursoController.alterar)
cursoRoutes.delete("/:id", auth, CursoController.excluir)

module.exports = cursoRoutes
