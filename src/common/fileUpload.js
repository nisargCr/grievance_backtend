const multer = require('multer');
const fs = require('fs');

class FileUpload {
    uploadStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            var imageDir=`./public/complaints/`;
            fs.mkdirSync(imageDir, { recursive: true })
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, imageDir)
            } else if (file.mimetype == "application/pdf") {
                cb(null, imageDir)
            } else {
                cb(new Error('invalid file type.'))
            }
        },
        filename: function (req, file, cb) {
            var imageName="complaintImage"+Date.now()+ '.png';
            cb(null, imageName);
        }
    });
    uploadStore = multer({ storage: this.uploadStorage });
}

module.exports = new FileUpload({});
