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
            console.log(reverseLogs);
        } catch (error) {
            res.json({ msg: 'Não foi encontrado Log' })
        }
    }
}

module.exports = log