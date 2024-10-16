const stream = require('stream');
const path = require('path');
const { google } = require('googleapis');
const shortid = require('shortid');

const KEYFILEPATH = path.join(__dirname, '../config/credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

const uploadFile = async (body, fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: 'v3', auth: auth }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: body.orcamento + '-' + shortid.generate() + '.' + fileObject.originalname.split('.')[1],
        parents: ['1XeWF5eidcOqwl6skxp0AwBI2nE2cZvc_'],
      },
      fields: 'id,name',
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id;
};

const uploads = {
    async uploadFile(req, res) {
        try {
            const {body, files} = req;
            let file = null;

            for (let f = 0; f < files.length; f += 1) {
                file = await uploadFile(body, files[f]);
            }
            const link = `https://drive.google.com/uc?id=${file}&export=download`;
            // https://drive.google.com/file/d/${file}/view?usp=sharing&export=download

            res.status(200).json({msg: 'Upload realizado com sucesso!', link})
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: 'Erro ao realizar upload!'})
            
        }
    }
}

module.exports = uploads;