const stream = require('stream');
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');

const uploadRouter = express.Router();
const upload = multer();

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: 'v3' }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: ['DRIVE_FOLDER_ID'],
      },
      fields: 'id,name',
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};

uploadRouter.post('/uploadFile', upload.any(), async (req, res) => {
    try {
        const {body, files} = req;

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }

        res.status(200).json({msg: 'Upload realizado com sucesso!'})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Erro ao realizar upload!'})
    }
});