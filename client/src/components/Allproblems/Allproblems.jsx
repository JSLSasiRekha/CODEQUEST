
import Problemheading from './Problemheading';

const Allproblems = () => {
    const problems = [
        { id: 1, title: 'Two Sum' ,company:'Amazon',difficulty:"easy",topic:"binary search"},
        { id: 2, title: 'Reverse Linked List',company:"Microsoft",difficulty:"medium",topic:"Linked list" }, 
        { id: 3, title: 'Binary Tree Inorder Traversal',company:"Google",difficulty:"hard",topic:"Recursion" }
    ];

    return (
        <div>
            <h1>All Problems</h1>
            <ul>
                {problems.map(problem => (
                    <li key={problem.id}>
                       <Problemheading id={problem.id}title={problem.title}company={problem.company}difficulty={problem.difficulty} topic={problem.topic}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Allproblems;
