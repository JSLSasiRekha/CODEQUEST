import React from 'react';

const SingleProblem = ({ problem }) => {
    console.log(problem);

    return (
        <div className="w-[600px]">
            <h1 className="text-3xl color-white bg-[rgb(59, 177, 155)]"><strong>{problem.title}</strong></h1>
            <div className="flex">
                <p className="m-2">{problem.difficulty}</p>
                <div className="flex">
                    {problem.companies.map((company, index) => (
                        <p key={index} className="m-2">{company}</p>
                    ))}
                </div>
            </div>
            <p><strong>Description:</strong><pre className="whitespace-pre-wrap">{problem.description}</pre></p>

            <p><strong>Constraints:</strong><pre className="whitespace-pre-wrap">{problem.constraints}</pre></p>
            <div>
                {problem.ExampleTestCases.map((example, index) => (
                    <div key={index}>
                        <p><strong>Example {index + 1}:</strong></p>
                        <p><strong>Input:</strong> <pre className="whitespace-pre-wrap">{JSON.stringify(example.input).replace(/,/g, ', ').replace(/:/g, ': ')}</pre></p>
                        <p><strong>Output:</strong> <pre className="whitespace-pre-wrap">{JSON.stringify(example.output).replace(/,/g, ', ').replace(/:/g, ': ')}</pre></p>
                        <p><strong>Explanation:</strong> <pre className="whitespace-pre-wrap">{example.explanation}</pre></p>
                    </div>
                ))}
            </div>
            <p><strong>Topic:</strong>      <div className="flex">
                    {problem.tags && problem.tags.map((tag, index) => (
                        <p key={index} className="m-2">{tag}</p>
                    ))}
                </div></p>

        </div>
    );
};

export default SingleProblem;
