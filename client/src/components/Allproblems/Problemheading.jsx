import { Link } from 'react-router-dom';

const Problemheading = ({ id, title, difficulty, company, topic }) => {
    return (
        <div className='relative bg-[rgba(216,239,211,0.4)] ml-36 rounded-md w-[700px] p-4 mb-6'>
            <div>
                <Link to={`/problem/${id}`} ><strong>{title}</strong></Link>
                <button className='absolute top-3 h-12 right-12 bg-[#3BB19B] w-28 p-2 rounded-md'>
                <Link to={`/problem/${id}`} className="text-white no-underline">Solve</Link>
            </button>
            <div className='flex'>
                <p className="text-gray-400 mx-4 w-12">{difficulty}</p>
                <p className="text-gray-400 mx-4 w-12">{company}</p>
                <p className="text-gray-400 mx-4 w-40">{topic}</p>
                </div>
            </div>
        </div>
    );
};

export default Problemheading;
