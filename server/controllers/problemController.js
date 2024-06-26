const DSAProblem = require('../models/problem'); 
const fs = require('fs');
const path = require('path');



// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await DSAProblem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a problem by ID
const updateProblem = async (req, res) => {
  try {
    const updatedProblem = await DSAProblem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new problem
const createProblem = async (req, res) => {
    try {
      const { title, slug, description, difficulty, tags, companies, solution, constraints } = req.body;
  
      // Check if the slug already exists
      const existingProblem = await DSAProblem.findOne({ slug });
      if (existingProblem) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
  
      // Process test cases
      const testCases = [];
      if (req.files && req.files.inputFiles && req.files.outputFiles) {
        const { inputFiles, outputFiles } = req.files;
  
        for (let i = 0; i < inputFiles.length; i++) {
          const inputFilePath = inputFiles[i].path;
          const outputFilePath = outputFiles[i].path;
  
          testCases.push({
            input: inputFilePath,
            output: outputFilePath,
            hidden: req.body.hidden[i] === 'true',
            explanation: req.body.explanation[i]
          });
        }
      } else {
        return res.status(400).json({ error: 'No files uploaded or files structure incorrect' });
      }
      // Create new DSAProblem instance
      const newProblem = new DSAProblem({
        title,
        slug,
        description,
        difficulty,
        tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to array
        companies: companies.split(',').map(company => company.trim()), // Convert comma-separated companies to array
        solution,
        testCases,
        constraints
      });
  
      // Save the new problem to the database
      await newProblem.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Problem created successfully', problem: newProblem });
    } catch (error) {
      console.error('Error creating problem:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Delete a problem by ID
const deleteProblem = async (req, res) => {
  try {
    const deletedProblem = await DSAProblem.findByIdAndDelete(req.params.id);
    if (!deletedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a problem by slug
const getProblemBySlug = async (req, res) => {
  try {
    const problem = await DSAProblem.findOne({ slug: req.params.slug });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a problem by ID
const getProblemById = async (req, res) => {
  try {
    const problem = await DSAProblem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={
    getAllProblems,
    getProblemBySlug,
    getProblemById,
    updateProblem,
    deleteProblem,
    createProblem}
