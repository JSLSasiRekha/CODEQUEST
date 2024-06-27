import React, { useState } from 'react';

const SubmittedQuestions = ({ questions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate index range for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submitted Questions</h2>
      {/* Pagination controls */}
      <div className="mt-4 p-2 bg-[#EFF9ED] ">
        <button
          className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#3bb19b] text-white hover:bg-[#138a74]'}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
           &lt;
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          className={`px-3 py-1 rounded-md ${indexOfLastItem >= questions.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#3bb19b] text-white hover:bg-[#1aa088]'}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= questions.length}
        >
           &gt;
        </button>
      </div>
      <ul className="bg-[#EFF9ED] p-4 shadow-sm">
        {currentItems.map((question, index) => (
          <li key={index} className={`border rounded-md p-2 mb-2 shadow-md ${index % 2 === 0 ? 'bg-[#e1f3de]' : 'bg-[#e8efe7]'}`}>
            <div>
              <h3 className="text-lg font-bold text-[#3bb19b]">{question.title}</h3>
              <p className="text-sm text-gray-600">Status: {question.status}</p>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default SubmittedQuestions;
