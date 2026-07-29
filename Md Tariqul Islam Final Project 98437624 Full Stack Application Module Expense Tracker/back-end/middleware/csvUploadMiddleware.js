const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv'];
    const isCsvExt = file.originalname.toLowerCase().endsWith('.csv');

    if (allowedTypes.includes(file.mimetype) || isCsvExt) {
        cb(null, true);
    } else {
        cb(new Error('Only .csv files are allowed'), false);
    }
};

const csvUpload = multer({ storage, fileFilter });

module.exports = csvUpload;