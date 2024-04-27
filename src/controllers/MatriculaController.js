const Matricula = require("../models/Matricula")
const Aluno = require("../models/Aluno")
const Curso = require("../models/Curso")

class MatriculaController {

    async cadastrar(req,res){
        try {
            const aluno_id = req.body.aluno_id
            const curso_id = req.body.curso_id
            
            if (!curso_id || !aluno_id) {
                return res
                    .status(400)
                    .json({ mensagem: 'O ID do aluno e do curso são obrigatórios.' })
            }

            const alunoExistente = await Aluno.findByPk(aluno_id)

            if(!alunoExistente) {
                return res.status(404).json({messagem: 'O aluno não existe.'})
            }

            const cursoExistente = await Curso.findByPk(curso_id)

            if(!cursoExistente) {
                return res.status(404).json({messagem: 'O curso não existe.'})
            }

            const matriculaExiste = await Matricula.findOne({
                where: {
                    aluno_id: aluno_id,
                    curso_id: curso_id
                }
            })

            if (matriculaExiste) {
                return res.status(409).json({messagem: 'Aluno já está matriculado no curso.'})
            }

            const matricula = await Matricula.create({
                aluno_id,
                curso_id
            })

            res.status(201).json(matricula)
        } catch (error) {
            res.status(500).json({messagem: 'Houve um erro ao cadastrar ao matricula'})
        }
    }

    async listarTodos(req, res) {
        try {
            const matriculas = await Matricula.findAll()
            
            if (matriculas.length === 0) {
                return res.status(400).json({messagem: "Não existe nenhuma matricula cadastrada."})
            }

            res.json(matriculas)
        } catch (error) {
            res.status(500).json({ error: 'Não é possível listar os matriculas' })
        }
    }

    async listarUm(req, res) {
        try {

            const { id } = req.params

            const matricula = await Matricula.findByPk(id)

            if (!matricula) {
                return res.status(404).json({ message: "Matricula não encontrada!" })
            }

            res.json(matricula)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não é possível listar a matricula específicada',
                error: error
            })
        }
    }
}

module.exports = new MatriculaController()