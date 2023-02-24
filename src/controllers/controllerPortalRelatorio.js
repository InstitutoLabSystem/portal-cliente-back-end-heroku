const PortalRelatorios = require('../models/PortalRelatorio')
const date = require('./date')

const portalRelatorio = {
  async upload(orcamento, uploadNome, chaveEstrangeira) {
    console.log(orcamento, uploadNome, chaveEstrangeira)
    if (orcamento && uploadNome && chaveEstrangeira) {
      try {
        await PortalRelatorios.create({
          id_portal_acessos: chaveEstrangeira,
          orcamento,
          revisao: 0,
          upload_data: date.date_time,
          uploadNome,
        })
      } catch (e) {
        return false
      }
      return true
    }
  },
}

module.exports = portalRelatorio
