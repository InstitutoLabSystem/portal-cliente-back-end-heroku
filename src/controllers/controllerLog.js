const Log = require('../models/Log')

const log = {

    async create(orcamento, data_criacao, responsavel) {
        if (orcamento && data_criacao && responsavel) {
            try {
                await Log.create({
                    orcamento: orcamento,
                    data_criacao: data_criacao,
                    responsavel: responsavel,
                    status: 'Enviado',
                })
            } catch (error) {
                return false
            }
            return true
        }
    },

    async createDelete(orcamento, data_criacao, responsavel) {
        if (orcamento && data_criacao && responsavel) {
            try {
                await Log.create({
                    orcamento: orcamento,
                    data_criacao: data_criacao,
                    responsavel: responsavel,
                    status: 'Excluido',
                })
            } catch (error) {
                return false
            }
            return true
        }
    },
    async get(req, res) {
        try {
            const logs = await Log.findAll();
            const reverseLogs = logs.reverse();
            res.json(reverseLogs);
        } catch (error) {
            res.json({ msg: 'Não foi encontrado Log' })
        }
    },

    async getOne(req, res) {
        try {
            const logs = await Log.findAll({
                where: { orcamento: req.query.orcamento },
            });
            if (logs) {
                const reverseLogs = logs.reverse();
                res.status(200).json(reverseLogs);
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Erro ao buscar orçamento' })
        }
    },
}

module.exports = log