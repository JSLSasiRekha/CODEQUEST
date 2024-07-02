const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log("compiling...");
    console.log({ filepath, outPath, outputPath, jobId, inputPath });
    
    return new Promise((resolve, reject) => {
        exec(
            `gcc "${filepath}" -o "${outPath}" && cd "${outputPath}" && "${jobId}.exe" < "${inputPath}"`,
            { shell: "cmd.exe" },
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Compilation error: ${error}`);
                    reject({ error, stderr });
                }
                if (stderr) {
                    console.error(`Compilation stderr: ${stderr}`);
                    reject(stderr);
                }
                console.log(`Compilation successful. Output:`);
                console.log(stdout);
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeC,
};
