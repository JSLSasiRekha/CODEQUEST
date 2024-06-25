import SingleProblem from '../components/Singleproblem/singleproblem';
import Compiler from '../components/Singleproblem/Compiler'
import {useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Merged=()=>{
    const { id } = useParams();
    console.log(id);
    const problems = [
        { 
            id: 1, 
            title: 'Two Sum', 
            description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.', 
            difficulty: 'Easy', 
            company: 'Google', 
            topic: 'Array',
            examples: [
                {
                    input: { nums: [2, 7, 11, 15], target: 9 },
                    output: [0, 1],
                    explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
                },
                {
                    input: { nums: [3, 2, 4], target: 6 },
                    output: [1, 2],
                    explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
                }
            ],
            constraints: 'Each input would have exactly one solution. You may not use the same element twice. The returned indices must be in ascending order.'
        },
        { 
            id: 2, 
            title: 'Reverse Linked List', 
            description: 'Reverse a singly linked list.', 
            difficulty: 'Medium', 
            company: 'Facebook', 
            topic: 'Linked List',
            examples: [
                {
                    input: { head: [1, 2, 3, 4, 5] },
                    output: [5, 4, 3, 2, 1],
                    explanation: 'Reversing the list [1, 2, 3, 4, 5] results in [5, 4, 3, 2, 1]'
                },
                {
                    input: { head: [1, 2] },
                    output: [2, 1],
                    explanation: 'Reversing the list [1, 2] results in [2, 1]'
                }
                
            ],
            constraints: 'The number of nodes in the list is in the range [0, 5000]. -5000 <= Node.val <= 5000'
        },
        { 
            id: 3, 
            title: 'Binary Tree Inorder Traversal', 
            description: 'Given a binary tree, return the inorder traversal of its nodes\' values.', 
            difficulty: 'Hard', 
            company: 'Amazon', 
            topic: 'Tree',
            examples: [
                {
                    input: { root: [1, null, 2, 3] },
                    output: [1, 3, 2],
                    explanation: 'The inorder traversal of the binary tree [1, null, 2, 3] is [1, 3, 2]'
                },
                {
                    input: { root: [] },
                    output: [],
                    explanation: 'The inorder traversal of an empty tree is an empty list'
                }
            ],
            constraints: 'The number of nodes in the tree is in the range [0, 100]. -100 <= Node.val <= 100'
        }
    ];
    
    const problem = problems.find(problem => problem.id === parseInt(id, 10));

    if (!problem) {
        return <div>Problem not found</div>;
    }
    return<>
    <Navbar/>
    <div className='flex bg-[#F1F8E8]'>
        <div className='w-1/2 p-10'>
        <SingleProblem  problem={problem}/>
        </div>
        <div className='w-1/2'>
        <Compiler/>
        </div>
        
        
    </div>
    </>
}
export default Merged;