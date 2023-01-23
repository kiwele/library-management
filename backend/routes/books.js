/* eslint-disable import/extensions */
// /* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// handle upload issues
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

// router.post('/post', upload.array('file'), createPost);
// router.get('/post', getPost);

const bookRouter = router;
export default bookRouter;
