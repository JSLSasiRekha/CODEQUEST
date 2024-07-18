import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from "../../config";
import Navbar from "../navbar/Navbar";
import { useNavigate } from 'react-router-dom';



const EditProblem = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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
    testCases: { inputFiles: [], outputFiles: [] }
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${url}/api/problems/${slug}`);
        console.log(response.data.problem)
        const problem = response.data.problem;
        setFormData({
            title: problem.title || '',
            slug: problem.slug || '',
            description: problem.description || '',
            difficulty: problem.difficulty || 'Easy',
            tags: Array.isArray(problem.tags) ? problem.tags.join(', ') : '',
            companies: Array.isArray(problem.companies) ? problem.companies.join(', ') : '',
            solution: problem.solution || '',
            ExampleTestCases: problem.ExampleTestCases || [{ input: '', output: '', explanation: '' }],
            constraints: problem.constraints || '',
          testCases: { inputFiles: [], outputFiles: [] } // We do not fetch files, just reset
        });
        console.log("fetched data",formData)
      } catch (error) {
        console.error('There was an error fetching the problem:', error);
      }
    };
    fetchProblem();
  }, [slug]);

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

    try {
        for (let [key, value] of data.entries()) {
            console.log(key, value);
          }
    
      const response = await axios.put(`${url}/api/problems/${slug}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Problem updated:', response.data);
    } catch (error) {
      console.error('There was an error updating the problem:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this problem?");
      if (!confirmDelete) return;
  
      await axios.delete(`${url}/api/problems/${slug}`, {
        withCredentials: true,
      });
      alert("Problem deleted successfully");
      navigate('/admin-dashboard'); // Redirect to the problems list or another appropriate page
    } catch (error) {
      console.error('There was an error deleting the problem:', error);
      alert("There was an error deleting the problem");
    }
  };

  return (
    <>
    <Navbar/>
    <form className="space-y-6 ml-44 p-6 w-3/4 shadow-md rounded-md bg-[#EFF9ED] " onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 className='text-3xl mt-6 ml-80 text-[#3bb19b] font-bold'>Edit Problem</h1>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Slug:</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Difficulty:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Tags:</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Comma separated"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Companies:</label>
        <input
          type="text"
          name="companies"
          value={formData.companies}
          onChange={handleChange}
          placeholder="Comma separated"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Solution:</label>
        <textarea
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Example Test Cases:</label>
        {formData.ExampleTestCases.map((testCase, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              name="input"
              placeholder="Input"
              value={testCase.input}
              onChange={(e) => handleExampleTestCaseChange(index, e)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="output"
              placeholder="Output"
              value={testCase.output}
              onChange={(e) => handleExampleTestCaseChange(index, e)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="explanation"
              placeholder="Explanation"
              value={testCase.explanation}
              onChange={(e) => handleExampleTestCaseChange(index, e)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        ))}
        <button type="button" onClick={addExampleTestCase} className="mt-2 bg-[#3bb19b] hover:bg-[#0a8a73] text-white font-bold py-2 px-4 rounded">
          Add Another Example Test Case
        </button>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Constraints:</label>
        <textarea
          name="constraints"
          value={formData.constraints}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Test Case Input Files:</label>
        <input
          type="file"
          name="inputFiles"
          onChange={handleFileChange}
          multiple
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Test Case Output Files:</label>
        <input
          type="file"
          name="outputFiles"
          onChange={handleFileChange}
          multiple
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100"
        />
      </div>
      <button type="submit" className="bg-[#3bb19b] hover:bg-[#0a8a73] text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
      <button className="bg-[#3bb19b] hover:bg-[#0a8a73] text-white font-bold py-2 px-4 rounded ml-8" onClick={handleDelete}>
        Delete
      </button>
    </form>
    </>
  );
};

export default EditProblem;
