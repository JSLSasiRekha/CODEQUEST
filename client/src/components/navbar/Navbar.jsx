import {Link, useNavigate} from 'react-router-dom'
import styles from "./styles.module.css";
import { RxAvatar } from "react-icons/rx";
import { RiAdminFill } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { useGlobalContext } from "../../context.jsx"



const Navbar=()=>{
	const navigate= useNavigate();
    const {user, logoutUser } = useGlobalContext();
	console.log(user)
   const handleLogout = () => {
       localStorage.removeItem("token");
       logoutUser()
	   navigate('/login')
       window.location.reload();
   };

    return(<nav className={styles.navbar} >
		<Link to="/">
				<h1>CodeQuest</h1>
				</Link>
				<div className='flex gap-4 ml-[40.5rem]'>
				{user.role==='admin' && <Link to={"/admin-dashboard"}>
					<RiAdminFill 
					className='ml-[10.5rem]'
					size={40}	
					/>
				</Link>}
				<Link to="/allproblems">
				<FaCode 
				size={40}
				/>
				</Link>
				<Link to="/leaderboard">
				<FaMedal 
				size={32}
				className='mt-2'
				/>
				</Link>
				<Link to={`/user/${user?.userName}`}>
					<RxAvatar
					size={40}
					/>
				</Link>
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>)
}
export default Navbar;
