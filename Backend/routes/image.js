const mongoose = require('mongoose');
const router = require('express').Router();
const uploadMiddleware = require('../middleware/multer-gridfs');
require('dotenv').config();

const mongoURI = process.env.DB_CONNECTION;
const conn = mongoose.createConnection(mongoURI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});
router.post('/upload/', uploadMiddleware, async (req, res) => {
  const { file } = req;
  const { id } = file;
  if (file.size > 5000000) {
    deleteImage(id);
    return res.status(400).send('file may not exceed 5mb');
  }
  console.log('uploaded file: ', file);
  return res.send(file.id);
});

router.get('/:id', async ({ params: { id } }, res) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    
    while (!gfs){ await sleep(100); }

    gfs.find({ _id }).toArray(async (err, files) => {
        if (!files || files.length === 0) 
          res.setHeader("Content-Type","image/png");
        var buffer = await streamToString(gfs.openDownloadStream(_id));
        res.status(200).send(buffer);
    });
});

function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  })
}

const deleteImage = (id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
    if (err) return res.status(500).send('image deletion error');
  });
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = router;
