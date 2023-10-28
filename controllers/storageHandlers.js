const fs = require('fs');
const path = require('path');


// const productPath = path.join(productDir, req.file.name);

function uploadsDestHandler(req, file, cb) {
  
  // Create the product directory if it doesn't exist
  const productDir = `./public/uploads/${req.body.name}`;
  fs.mkdirSync(productDir, {recursive: true });
  cb(null, productDir);
}

function uploadsFilenameHandler(req, file, cb) {
  const date = new Date();
  const timestamp = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;

  // Get the original filename without extension
  // const originalName = file.originalname.replace(/\.[^/.]+$/, '');

  // Check if the file already exists
  let count = 1;
  let newFilename = `image-${count}-${timestamp}.png`;
  newFilename = newFilename.replace(/\n/g, '');
  
  const productDir = `./public/uploads/${req.body.name}`;
  while (fs.existsSync(path.join(productDir, newFilename))) {
    count++;
    newFilename = `image-${count}-${timestamp}.png`;
    newFilename = newFilename.replace(/\n/g, '');
  }
  cb(null, newFilename);
}

module.exports = {
  uploadsDestHandler,
  uploadsFilenameHandler
};