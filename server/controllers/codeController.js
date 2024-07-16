const { generateInputFile } = require("../execute/generateInputFile");
const { generateFile } = require("../execute/generateFile");
const { executeCpp } = require("../execute/executeCpp");
const { executeJava } = require("../execute/executeJava");
const { executePython } = require("../execute/executePy");
const {executeC}=require('../execute/executeC');
const Problem=require('../models/problem');
const { User} = require('../models/user');
const {downloadFromFirebase}=require('../firebase/GetFile');
const Submission=require('../models/Submission');
const fs = require("fs");
const { propfind } = require("../routes/user");


function compareFilesSync(filepath1, filepath2) {
  try {
      const data1 = fs.promises.readFile(filepath1, 'utf8');
      const data2 = fs.promises.readFile(filepath2, 'utf8');

      if (data1 === data2) {
          console.log('The files have the same content.');
          return true;
      } else {
          console.log('The files have different content.');
      }
      return false;
  } catch (err) {
      console.error('Error reading files:', err);
  }
}

const compile = async (req, res) => {
  const { language, code, input } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output;
    if (language === "cpp")
       output = await executeCpp(filePath, inputPath);
    else if (language === "java")
      output = await executeJava(filePath, inputPath);
    else if (language === "python")
      output = await executePython(filePath, inputPath);
    else if(language==='c')
      output=await executeC(filePath,inputPath);
    res.json({ filePath, inputPath, output });
   
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const submitCode = async (req, res) => {
  let { language = "cpp", code, problemSlug, userId } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  try { 
    const filePath = await generateFile(language, code);
  const problemfetched=  await Problem.findOne({ slug: problemSlug });
  const problemHeading= problemfetched.title;
  if (!problemfetched)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No problem found!" });
  let output,status="wrong Answer";
  const testcases=problemfetched.testCases;
 
  if(language==='c')
    {
      console.log('c');
      for (let i = 0; i < testcases.length; i++) {
        const inputpath=testcases[i].input;
        const outputpath=testcases[i].output;
        const inputPath=await downloadFromFirebase(inputpath,"inputs");
        output = await executeC(filePath, inputPath);
        const outputPath=await downloadFromFirebase(outputpath,"outputs");
        const answer =  fs.readFileSync(outputPath, 'utf8');
        if(answer.trim()===output.trim())
          status="Accepted";
    }
    }
    else if(language==='java'){
      console.log('java');
      for (let i = 0; i < testcases.length; i++) {
        const inputpath=testcases[i].input;
        const outputpath=testcases[i].output;
        const inputPath=await downloadFromFirebase(inputpath,"inputs");
        output = await executeJava(filePath, inputPath);
        const outputPath=await downloadFromFirebase(outputpath,"outputs");
        const answer =  fs.readFileSync(outputPath, 'utf8');
        if(answer.trim()===output.trim())
          status="Accepted";
    }
    }
    else if(language==='python'){
      console.log('python');
      for (let i = 0; i < testcases.length; i++) {
        const inputpath=testcases[i].input;
        const outputpath=testcases[i].output;
        const inputPath=await downloadFromFirebase(inputpath,"inputs");
        output = await executePython(filePath, inputPath);
        const outputPath=await downloadFromFirebase(outputpath,"outputs");
        const answer =  fs.readFileSync(outputPath, 'utf8');
        if(answer.trim()===output.trim())
          status="Accepted";
    }
    }
    else{
      console.log('cpp');
        for (let i = 0; i < testcases.length; i++) {
          const inputpath=testcases[i].input;
          const outputpath=testcases[i].output;
          const inputPath=await downloadFromFirebase(inputpath,"inputs");
          output = await executeCpp(filePath, inputPath);
          const outputPath=await downloadFromFirebase(outputpath,"outputs");
          const answer =  fs.readFileSync(outputPath, 'utf8');
          if(answer.trim()===output.trim())
            status="Accepted";
      }
    }
    
   

 
    if (status === 'Accepted') {
      
     const submitted=await Submission.find({userId:userId,problemSlug:problemSlug,status:"Accepted"});
     if(!submitted){
      let score;
      let updateFields = { points: 0 };
    
      if (problemfetched.difficulty === 'Easy') {
        score = 20;
        updateFields = { $inc: { points: score, easySolved: 1 } };
      } else if (problemfetched.difficulty === 'Medium') {
        score = 40;
        updateFields = { $inc: { points: score, mediumSolved: 1 } };
      } else {
        score = 60;
        updateFields = { $inc: { points: score, hardSolved: 1 } };
      }
    
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
    
      // Increment the user's points and solved count based on difficulty
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        updateFields,
        { new: true }
      );
    
      console.log("User Updated Successfully");
    }
    
    }
    const submission = new Submission({
      code,
      language,
      status,
      problemSlug,
      problemHeading,
      userId,
     
    });
    await submission.save();
    console.log("saved successfully")
    res.json({status});
   
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getStatus = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json("Missing required fields");
  }

  try {
    const job = await Job.findById(req.params.id);

    res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
};

const getAllSubmissions = async (req, res) => {
  const userId = req.user._id;
  const problemId = req.params.id;
  if (!userId) return res.status(400).json("Missing required fields.");

  try {
    const submissions = await Job.find({
      userId,
      problemId,
      verdict: { $exists: true },
    }).sort({ submittedAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const downloadSubmission = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json("Missing required fields");

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(400).json("File not found");
    }
    res.download(job.filepath);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  compile,
  submitCode,
  getStatus,
  getAllSubmissions,
  downloadSubmission,
};