import { Link } from 'react-router-dom';

const Problemheading = ({ id, title, difficulty, companies, tags,slug }) => {
    return (
        <div className='relative bg-[rgba(216,239,211,0.4)] ml-36 rounded-md w-[700px] p-4 mb-6'>
            <div>
                <Link to={`/problem/${slug}`} ><strong>{title}</strong></Link>
                <button className='absolute top-3 h-12 right-12 bg-[#3BB19B] w-28 p-2 rounded-md'>
                <Link to={`/admin/problem/${slug}`} className="text-white no-underline">Edit</Link>
            </button>
            <div className='flex h-[30px]'>
            <p className="text-gray-700 w-[80px] pb-7 bg-[rgba(177,218,169,0.4)] px-1 m-1 border border-gray-200 rounded">{difficulty}</p>

                <p className="text-gray-700 w-36 bg-[rgba(177,218,169,0.4)] pb-7  px-1 m-1 border border-gray-200 rounded">
                <div className="flex gap-2">
                    {companies.map((company, index) => (
                        <p key={index}>{company}</p>
                    ))}
                </div>
                </p>
                <p className="text-gray-700 w-36 pb-7 bg-[rgba(177,218,169,0.4)] px-1 m-1 border border-gray-200 rounded"> <div className="flex gap-2">
                    {tags.map((tag, index) => (
                        <p key={index}>{tag}</p>
                    ))}
                </div></p>
                </div>
            </div>
        </div>
    );
};

export default Problemheading;
