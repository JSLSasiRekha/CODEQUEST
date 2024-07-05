const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  companies:{
    type:[String],
    required:true,
  },
  solution: {
    type: String,
    
  },
  ExampleTestCases:[{
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  }

  ],
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      }
   
    },
  ],
  constraints: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model using the schema
const Problem = mongoose.model('Problem', ProblemSchema);


module.exports = Problem;
