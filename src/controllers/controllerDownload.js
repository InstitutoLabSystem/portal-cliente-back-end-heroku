const Downloads = require('../models/PortalDownload')

const downloads = {
  async get(req, res) {
    if (!req.query.orcamento) {
      return res.status(400).json({ msg: 'Error, campos vazios' })
    }
    try {
      if (req.query.idPortalAcessos) {
        console.log('entrou aqui')
        const result = await Downloads.findAll({
          where: {
            orcamento: req.query.orcamento,
            id_portal_acessos: req.query.idPortalAcessos,
          },
        })
        return res.json(result)
      }
      const result = await Downloads.findAll({
        where: {
          orcamento: req.query.orcamento,
        },
      })
      res.json(result)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ msg: 'Erro na busca' })
    }
  },
  async post(req, res) {
    if (
      !req.body.id ||
      !req.body.dataDownload ||
      !req.body.orcamento ||
      !req.body.downloadIp ||
      !req.body.nome
    ) {
      return res.status(400).json({ msg: 'Error, Campos vazios' })
    }
    // const dataHora = req.body.dataDownload.split('T')
    // const data = dataHora[0] + 'T'
    // const hora = dataHora[1].split(':')[0] - 3
    // const minutos = dataHora[1].split(':')[1]
    // const segundo = dataHora[1].split(':')[2]
    // const horario = hora + ':' + minutos + ':' + segundo
    // const date = data + horario
    const data = new Date()
    try {
      await Downloads.create({
        id_portal_acessos: req.body.id,
        orcamento: req.body.orcamento,
        download_nome: req.body.nome,
        download_data: data,
        download_ip: req.body.downloadIp,
        download_localizacao: req.body.localizacao,
      })
      res.json({ msg: 'Sucesso!' })
    } catch (e) {
      return res.status(400).json({ msg: 'não foi possível fazer o download!' })
    }
  },
}

module.exports = downloads
