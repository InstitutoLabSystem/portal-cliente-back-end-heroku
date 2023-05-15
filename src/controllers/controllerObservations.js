const Observation = require('../models/Observation')

const observations = {
    async create(req, res) {
        if (!req.body.titulo || !req.body.descricao || !req.body.orcamento) {
            return res.status(400).json({ msg: 'Campos não encontrado!' })
        }
        console.log(req.body.orcamento)
        try {
            const observation = await Observation.create({
                orcamento: req.body.orcamento,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
            })
            return res.json({ msg: 'Observação criada com sucesso!', observation })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'Erro, não foi possivel realizar a observação!' })
        }
    },

    async get(req, res) {
        try {
            const observation = await Observation.findAll();
            res.json(observation);
            console.log(observation);
        } catch(error) {
            res.json({ msg: 'Não foi possivel encontrar nenhuma observação!' })
        }
    },

    async getOne(req, res) {
         try {
            const observation = await Observation.findAll({
                where: { orcamento: req.query.orcamento},
            });
            res.status(200).json(observation)
         } catch(error) {
            console.error(error)
            res.json ({ msg: 'Não foi possivel encontrar nenhuma observação' })
         }
    },

    async update(req, res) {
        try{
            await Observation.update(
                {
                    titulo: req.body.titulo, 
                    descricao: req.body.descricao,
                },
                
                 { where: { id: req.body.id } },
             )
             const observation = {
                 id: req.body.id,
                 titulo: req.body.titulo,
                 descricao: req.body.descricao,
             }
             return res.json({ msg: 'Observação atualizada com sucesso', observation})
         } catch (error) {
            console.log(error)
             return res.status(400).json({ msg : 'Error, Não foi possivel atualizar a observação'})
         }
    },

    async delete(req, res) {
        try {
            const observation = await Observation.findOne({
                where: { id: req.query.id }
            })
            if (!observation) {
                return res.status(400).json({ msg: 'Erro, Id não existente!'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'Erro, Id não existente!' })
        }

        try {
            await Observation.destroy({
                where: { id: req.query.id }
            })
            return res.status(200).json({ msg: 'Observação deletada com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'Erro ao deletar observação' })
        }

    }
}

module.exports = observations