const { v4: uuid } = require("uuid");
const { bucket } = require("./admin"); // Adjust the import as necessary
const fs = require("fs");

const saveFileToFirebase = async (folder, format, filePath) => {
  try {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const file = bucket.file(`${folder}/${filename}`);

    // Create a stream to read the file
    const readStream = fs.createReadStream(filePath);

    // Create a write stream to upload the file to Firebase
    const writeStream = file.createWriteStream({
      resumable: false,
      metadata: {
        contentType: "text/plain", // Adjust content type as necessary
      },
    });

    // Pipe the read stream to the write stream
    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${folder}/${filename}`;
    return fileUrl;
  } catch (error) {
    throw new Error(`Failed to save file to Firebase: ${error.message}`);
  }
};

module.exports = {
  saveFileToFirebase,
};
