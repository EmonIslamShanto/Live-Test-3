const express = require('express');
const multer = require('multer');

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, 'uploads/');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');
const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.post('/upload', upload.single('file'), function(req, res) {
  try {
    res.send('File uploaded successfully!');
  } catch (error) {
    res.sendStatus(400).send('Error uploading file');
  }
});

const PORT = 3000;
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
