import Navbar from "../components/navbar/Navbar";
import CreateProblem  from "../components/admin/createProblem";
const AdminDashboard=()=>{
   return( <>
   <div className="bg-[rgba(216,239,211,0.4)]">
   <Navbar/>
 
     <CreateProblem/>
     </div>
    </>
   )
}

export default AdminDashboard;