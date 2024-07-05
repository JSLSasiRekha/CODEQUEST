import  { useState } from 'react';
import axios from 'axios';
import {url} from "../../config"

const CreateProblem= () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    difficulty: 'Easy',
    tags: '',
    companies: '',
    solution: '',
    ExampleTestCases: [{ input: '', output: '', explanation: '' }],
    constraints: '',
    testCases:{inputFiles:[],outputFiles:[]}
   
  });
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExampleTestCaseChange = (index, e) => {
    const newExampleTestCases = formData.ExampleTestCases.map((testCase, i) =>
      i === index ? { ...testCase, [e.target.name]: e.target.value } : testCase
    );
    setFormData({ ...formData, ExampleTestCases: newExampleTestCases });
  };

  const addExampleTestCase = () => {
    setFormData({
      ...formData,
      ExampleTestCases: [...formData.ExampleTestCases, { input: '', output: '', explanation: '' }],
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      testCases: {
        ...formData.testCases,
        [name]: files,
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log("Appending form data...");
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('description', formData.description);
    data.append('difficulty', formData.difficulty);
    data.append('tags', formData.tags);
    data.append('companies', formData.companies);
    data.append('solution', formData.solution);
    data.append('constraints', formData.constraints);
    
    formData.ExampleTestCases.forEach((testCase, index) => {
      data.append(`ExampleTestCases[${index}][input]`, testCase.input);
      data.append(`ExampleTestCases[${index}][output]`, testCase.output);
      data.append(`ExampleTestCases[${index}][explanation]`, testCase.explanation);
    });
  
    Array.from(formData.testCases.inputFiles).forEach((file, index) => {
      data.append('inputFiles', file);
    });
  
    Array.from(formData.testCases.outputFiles).forEach((file, index) => {
      data.append('outputFiles', file);
    });
    for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
  
    try {
      const response = await axios.post(`${url}/api/problems/allproblems`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Problem created:', response.data);
    } catch (error) {
      console.error('There was an error creating the problem:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Slug:</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Difficulty:</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Tags:</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Comma separated" required />
      </div>
      <div>
        <label>Companies:</label>
        <input type="text" name="companies" value={formData.companies} onChange={handleChange} placeholder="Comma separated" required />
      </div>
      <div>
        <label>Solution:</label>
        <textarea name="solution" value={formData.solution} onChange={handleChange} />
      </div>
      <div>
        <label>Example Test Cases:</label>
        {formData.ExampleTestCases.map((testCase, index) => (
          <div key={index}>
            <input type="text" name="input" placeholder="Input" value={testCase.input} onChange={(e) => handleExampleTestCaseChange(index, e)} required />
            <input type="text" name="output" placeholder="Output" value={testCase.output} onChange={(e) => handleExampleTestCaseChange(index, e)} required />
            <input type="text" name="explanation" placeholder="Explanation" value={testCase.explanation} onChange={(e) => handleExampleTestCaseChange(index, e)} required />
          </div>
        ))}
        <button type="button" onClick={addExampleTestCase}>Add Another Example Test Case</button>
      </div>
      <div>
        <label>Constraints:</label>
        <textarea name="constraints" value={formData.constraints} onChange={handleChange} required />
      </div>
      <div>
        <label>Test Case Input Files:</label>
        <input type="file" name="inputFiles" onChange={handleFileChange} multiple required />
      </div>
      <div>
        <label>Test Case Output Files:</label>
        <input type="file" name="outputFiles" onChange={handleFileChange} multiple required />
      </div>
      <button className='bg-[#3BB19B] rounded-sm p-2 ml-6 text-white' type="submit">Submit</button>
    </form>
  );
};

export default CreateProblem;
