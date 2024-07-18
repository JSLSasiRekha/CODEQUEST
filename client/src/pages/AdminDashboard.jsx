import Navbar from "../components/navbar/Navbar";
import AdminAllproblems from "../components/admin/AdminAllproblems";
import { FaPlusCircle } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
const AdminDashboard=()=>{
   return( <>
   <div >
   <Navbar/>
   <Link to="/admin/add">
   <div className="flex flex-row gap-4">
   <h1 className='text-2xl mt-6 ml-80 text-[#3bb19b] font-bold'>Add a new Problem</h1>
   <FaPlusCircle size={32}
				className='mt-6'/>
            </div>
   </Link>
     <AdminAllproblems/>
     </div>
    </>
   )
}

export default AdminDashboard;