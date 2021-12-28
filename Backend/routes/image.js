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

router.get('/:id', ({ params: { id } }, res) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.find({ _id }).toArray((err, files) => {
        if (!files || files.length === 0)
        return res.status(400).send('no files exist');
        gfs.openDownloadStream(_id).pipe(res);
    });
});

const deleteImage = (id) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) return res.status(500).send('image deletion error');
  });
};
module.exports = router;
