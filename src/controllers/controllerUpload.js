const axios = require('axios');
const FormData = require('form-data');

const uploads = {
    async uploadFile(req, res) {
        try {
            const { body, files } = req;

            let responses = [];

            for (let f = 0; f < files.length; f++) {
                const file = files[f];

                // Cria um FormData para enviar o arquivo e os dados
                const form = new FormData();
                form.append('file', file.buffer, {
                    filename: file.originalname,
                    contentType: file.mimetype,
                });

                // Adiciona dados extras do body ao form, se necessário
                form.append('orcamento', body.orcamento || '');

                // Envia para o webhook
                const response = await axios.post(
                    'https://n8n-labsystem-u40703.vm.elestio.app/webhook/portal',
                    form,
                    {
                        headers: form.getHeaders(),
                    }
                );

                responses.push(response.data);
            }

            res.status(200).json({
                msg: 'Arquivo(s) enviado(s) com sucesso ao webhook!',
                results: responses,
            });

        } catch (error) {
            console.error('Erro ao enviar para o webhook:', error);
            res.status(400).json({ msg: 'Erro ao enviar para o webhook!' });
        }
    }
};

module.exports = uploads;
