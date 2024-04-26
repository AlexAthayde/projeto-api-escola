const Professor = require('../models/Professor')

class ProfessorController {

    async listarTodos(req, res) {
        try {
            const professores = await Professor.findAll()
            res.json(professores)
        } catch (error) {
            res.status(500).json({ error: 'Não é possível listar os professores' })
        }
    }

    async cadastrar(req, res) {
        try {

            const email = req.body.email
            const password = req.body.password
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const celular = req.body.celular

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' })
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é obrigatória' })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento não está no formato correto' })
            }

            const professor = await Professor.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })

            res.status(201).json(professor)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível cadastrar o Profesor' })
        }
    }

    async listarUm(req, res) {
        try {

            const { id } = req.params

            const professor = await Professor.findByPk(id)

            if (!professor) {
                return res.status(404).json({ message: "Professor não encontrado!" })
            }

            res.json(professor)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não é possível listar o professor específicado',
                error: error
            })
        }
    }
}

module.exports = new ProfessorController()