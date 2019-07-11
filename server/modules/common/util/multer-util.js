const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/*" || file.mimetype === "video/*") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {
  fileFilter,
  fileStorage
};
