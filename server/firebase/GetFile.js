const path = require('path');
const { bucket } = require('./admin');

const downloadFromFirebase = async (firebaseUrl,folderName) => {
 
  const filename = path.basename(firebaseUrl);
  const tempFilePath = path.join(__dirname,"../execute/",folderName , filename);
 
  const file = bucket.file(`${folderName}/${filename}`);

  await file.download({ destination: tempFilePath });
  console.log("downloaded")
  return tempFilePath;
};

module.exports = {downloadFromFirebase};
