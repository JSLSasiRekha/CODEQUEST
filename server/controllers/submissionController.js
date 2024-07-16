const Submission = require('../models/Submission'); 
const {User}=require('../models/user');

const getAllSubmission = async (req, res) => {
    try {
      const submission = await Submission.find({});
      res.status(200).json({problems});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getSubmissionByuser = async (req, res) => {
  try {
    // console.log(req.params.username);
     const user=await User.findOne({userName: req.params.username});
     if(!user)
     {
      return res.status(404).json({ message: 'user not found' });
     }
    //  console.log(user);
    const submissions = await Submission.find({userId:user._id});
    if (!submissions) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json({submissions});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllSubmission,getSubmissionByuser };
  