const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { hrtime } = require('process');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const hrTime = hrtime();
    const randomBytes = crypto.randomBytes(8); // Generate 8 bytes of random data
    const uniqueSuffix = '-' + randomBytes.toString('hex'); // Convert bytes to hexadecimal string
    const uniqueTimestamp = `${hrTime[0]}-${hrTime[1]}${uniqueSuffix}`;
    cb(null, uniqueTimestamp + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.txt') {
      return cb(new Error('Only .txt files are allowed'));
    }
    cb(null, true);
  }
});

module.exports = {
  cpUpload: upload.fields([
    { name: 'inputFiles', maxCount: 10 },
    { name: 'outputFiles', maxCount: 10 }
  ])
};
