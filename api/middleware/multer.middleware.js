import multer from 'multer';

const FILE_TYPEs = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPEs[file.mimetype];
    if (!isValid) {
      return cb(new Error('invalid image type'));
    }

    let uploadError = new Error('invalid image type');
    if (isValid) {uploadError = null }
    cb(uploadError, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(/[^\w.-]/g, '-');
    cb(null, `${Date.now()}.${fileName}`);
  }
});

// const uploadOptions = multer({ dest: 'uploads/'});
const uploadOptions = multer({ storage: storage });

export default uploadOptions;
