const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJava = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const sanitizedJobId = `Class_${jobId.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const dirPath = path.dirname(filepath);
  const newJavaFile = path.join(dirPath, `${sanitizedJobId}.java`);

  return new Promise((resolve, reject) => {
    // Read the original Java file contents
    fs.readFile(filepath, "utf8", (err, fileData) => {
      if (err) {
        return reject({ step: "readFile", error: err });
      }

      // Replace the class name with the sanitized job ID
      const modifiedData = fileData.replace(
        /public class \w+/,
        `public class ${sanitizedJobId}`
      );

      // Write the modified data to a new Java file
      fs.writeFile(newJavaFile, modifiedData, "utf8", (err) => {
        if (err) {
          return reject({ step: "writeFile", error: err });
        }

        console.log("Java file written:", newJavaFile);

        // Compile the Java file
        exec(
          `javac "${newJavaFile}"`,
          (error, stdout, stderr) => {
            if (error) {
               resolve({ step: "compile", error, stderr });
            }
            if (stderr) {
               resolve({ step: "compile", error: stderr });
            }

            console.log("Java file compiled successfully.");

            // Read the input file contents
            fs.readFile(inputPath, "utf8", (err, inputData) => {
              if (err) {
                resolve({ step: "readInput", error: err });
              }

              console.log("Input data read:", inputPath);

              // Execute the compiled Java file
              const runCommand = `java -cp "${dirPath}" "${sanitizedJobId}"`;

              exec(
                runCommand,
                (error, stdout, stderr) => {
                  if (error) {
                  resolve({ step: "execute", error, stderr });
                  }
                  if (stderr) {
                     resolve({ step: "execute", error: stderr });
                  }

                  console.log("Java file executed successfully.");

                  resolve(stdout);
                }
              ).stdin.end(inputData); // Pass the input data to the process stdin
            });
          }
        );
      });
    });
  });
};

module.exports = {
  executeJava,
};
