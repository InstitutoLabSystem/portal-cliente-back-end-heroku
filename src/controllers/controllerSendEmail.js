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
            <td>anderson.hernandes@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Lucas Silva</td>
            <td>PCP</td>
            <td>lucas.rodrigues2@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Ana Soares</td>
            <td>PCP</td>
            <td>anapaula.silva@bureauveritas.com</td>
            </tr>
            <tr>
            <td>Dilma Meneses</td>
            <td>PCP</td>
            <td>dilmademeneses.silva@bureauveritas.com</td>
            </tr>
            <td>Darios Silva</td>
            <td>PCP</td>
            <td>dario.silva@bureauveritas.com</td>
            </tr>
            <td>Vitor Nogueira Navas</td>
            <td>PCP</td>
            <td>vitor.navas@bureauveritas.com</td>
            </tr>
        </table>
    `;

    const texto = `<p style="font-family: sans-serif">
      Prezado Cliente,<br><br>

      Seu relatório referente ao Orçamento: ${orcamento}, está disponível para download.<br><br>

      Para acessar entre no link abaixo com as seguintes informações:<br><br>

      <strong>Site: </strong>https://labsystem-nuvem.com.br/portal-cliente<br>
      <strong>Orçamento:</strong> ${orcamento}<br>
      <strong>Senha: </strong>${senha.toUpperCase()}<br><br>

      Todos os relatórios finalizados ficaram disponíveis para baixar por um período de 6 meses.<br><br>

      <hr>

      Informamos que as sobras das amostras de teste estão disponíveis para retirada.<br><br>

      Favor entrar em contato através dos e-mails: 
      dario.silva@bureauveritas.com; vitor.navas@bureauveritas.com para agendar a coleta.<br><br>

      As sobras das amostras serão mantidas armazenadas por um período de 10 dias a partir deste comunicado, 
      após esse período as amostras serão destinadas para descarte.<br><br>

      <em>*Caso não tenha selecionado a opção de retirada das sobras, por gentileza desconsiderar.</em><br><br>

      Atenciosamente,<br>
      Laboratório Lab System - A Bureau Veritas company.<br><br>

      Esse é um e-mail automático, favor não responder!<br>
      Em caso de dúvidas entre em contato com:<br><br>

      ${table}
      </p>`;

    const transporter = nodemailer.createTransport({
      host: 'cloud109.mailgrid.net.br',
      port: '465',
      secure: true,
      requireTLS: true,
      debug: true,
      auth: {
        user: 'labsystem@labsystem.com.br',
        pass: 'pBIF1iimmt',
      },
    });

    try {
      await transporter.sendMail({
        from: 'relatorios@labsystem.com.br',
        to: emails,
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
