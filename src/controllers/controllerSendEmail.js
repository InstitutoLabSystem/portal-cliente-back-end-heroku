const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = {
  async enviarEmail(
    orcamento,
    numprocesso,
    token,
    senha,
    cliente,
    solicitante,
    emails,
    nomeEmpresa,
    emailCopia,
  ) {
    if (!orcamento || !token || !senha || !nomeEmpresa || !emailCopia) {
      return false
    }

    const table = `
        <table border="1" style="text-align: center;font-family: sans-serif">
            <tr>
            <td><strong>Nome</strong></td>
            <td><strong>Setor</strong></td>
            <td><strong>E-mail</strong></td>
            </tr>
            <tr>
            <td>Sanderson Prado</td>
            <td>Qualidade</td>
            <td>qualidade1@labsystem.com.br</td>
            </tr>
            <tr>
            <td>Karine Galdino</td>
            <td>Qualidade</td>
            <td>qualidade6@labsystem.com.br</td>
            </tr>
            <tr>
            <td>Stephany Mendes</td>
            <td>Qualidade</td>
            <td>tecnico3@labsystem.com.br</td>
            </tr>
            <tr>
            <td>Joyce Moreira</td>
            <td>Qualidade</td>
            <td>tecnico1@labsystem.com.br</td>
            </tr>
        </table>
    `

    const texto = `<p style="font-family: sans-serif">Prezado Cliente,<br><br>Seu relatório referênte ao Orçamento: ${orcamento}, está  disponível para download.<br><br>
        E para melhor atendê-los, a Lab System está implementando em nosso site uma área exclusiva para os nossos clientes, onde todos os relatórios finalizados ficaram disponíveis para baixar por um período de 6 meses.<br>
        Para acessar entre no link abaixo com as seguintes informações:<br><br>
        <strong>Site: </strong>https://labsystem-nuvem.com.br/portal-cliente<br>
        <strong>Token:</strong> ${token}<br>
        <strong>senha: </strong>  ${senha}<br><br>
        Atenciosamente <br> Laboratório Lab System.<br><br>
        Esse é um e-mail automático, favor não responder! <br> Em caso de dúvidas entre em contato com:<br><br>${table}
        </p>
        `

    const transporter = nodemailer.createTransport({
      host: 'mail.institutolabsystem.com.br',
      port: '465',
      secure: true,
      requireTLS: true,
      // auth: { user: "relatorioslabsystem@chat.labsystem-nuvem.com.br", pass: "Relatorio@2022" }
      auth: {
        user: 'relatorios@institutolabsystem.com.br',
        pass: 'PaRHOOibupWm',
      },
    })

    try {
      await transporter.sendMail({
        // from: "relatorioslabsystem@chat.labsystem-nuvem.com.br",
        from: 'relatorios@institutolabsystem.com.br',
        to: emails,
        // to: 'victorbrunof@icloud.com, mmuramota1@gmail.com',
        cc: emailCopia,
        subject: `${solicitante} - ${cliente}, Orçamento: ${orcamento}, NP: ${numprocesso}`,
        html: texto,
      })
      return true
    } catch (error) {
      console.log('Erro Aqui no envio do email transporter: ', error)
      return false
    }
  },
}

module.exports = sendEmail
