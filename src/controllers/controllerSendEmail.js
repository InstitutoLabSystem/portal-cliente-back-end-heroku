const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = {
  async enviarEmail(
    orcamento,
    assunto,
    numprocesso,
    token,
    senha,
    cliente,
    solicitante,
    emails,
    nomeEmpresa,
    emailCopia
  ) {
    if (!orcamento || !token || !senha || !nomeEmpresa || !emailCopia) {
      return false;
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
            <td>sanderson.prado@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Joyce Moreira</td>
            <td>Qualidade</td>
            <td>joyce.farias@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Stephany Mendes</td>
            <td>Qualidade</td>
            <td>stephanymendesda.silva@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Anderson Hernandes</td>
            <td>PCP</td>
            <td>pcp@labsystem.com.br</td>
            <td>anderson.hernandes@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Lucas Silva</td>
            <td>PCP</td>
            <td>tecnico3@labsystem.com.br</td>
            <td>lucas.rodrigues2@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Ana Soares</td>
            <td>PCP</td>
            <td>tecnico1@labsystem.com.br</td>
            <td>anapaula.silva@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Dilma Meneses</td>
            <td>PCP</td>
            <td>tecnico@labsystem.com.br</td>
            <td>dilmademeneses.silva@bureauveritas.com</td>
            </tr>
        </table>
    `;

    const texto = `<p style="font-family: sans-serif">Prezado Cliente,<br><br>Seu relatório referênte ao Orçamento: ${orcamento}, está  disponível para download.<br><br>
        Para acessar entre no link abaixo com as seguintes informações:<br><br>
        <strong>Site: </strong>https://labsystem-nuvem.com.br/portal-cliente<br>
        <strong>Orçamento:</strong>${orcamento}<br>
        <strong>Senha: </strong>${senha.toUpperCase()}<br><br>
        Todos os relatórios finalizados ficaram disponíveis para baixar por um período de 6 meses.<br><br>
        Atenciosamente <br> Laboratório Lab System.<br><br>
        Esse é um e-mail automático, favor não responder! <br> Em caso de dúvidas entre em contato com:<br><br>${table}
        </p>
        `;

    const transporter = nodemailer.createTransport({
      host: 'cloud109.mailgrid.net.br',
      port: '465',
      secure: true,
      requireTLS: true,
      debug: true,
      // auth: { user: "relatorioslabsystem@chat.labsystem-nuvem.com.br", pass: "Relatorio@2022" }
      auth: {
        user: 'labsystem@labsystem.com.br',
        pass: 'pBIF1iimmt',
      },
    });

    try {
      await transporter.sendMail({
        // from: "relatorioslabsystem@chat.labsystem-nuvem.com.br",
        from: 'relatorios@labsystem.com.br',
        to: emails,
        // to: 'victorbrunof@icloud.com, mmuramota1@gmail.com',
        cc: emailCopia,
        subject: `${assunto}`,
        html: texto,
      });
      return true;
    } catch (error) {
      console.log('Erro Aqui no envio do email transporter: ', error);
      return false;
    }
  },
};

module.exports = sendEmail;
