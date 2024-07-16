const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    problemSlug: {
      type: String,
      required: true,
    },
    problemHeading:{
      type:String,
      required:true,
    },
    language: {
      type: String,
      required: true,
      enum: ["cpp", "java", "python","c"],
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);