import {Link, useNavigate} from 'react-router-dom'
import styles from "./styles.module.css";
import { RxAvatar } from "react-icons/rx";
import { useGlobalContext } from "../../context.jsx"


const Navbar=()=>{
	const navigate= useNavigate();
    const {user, logoutUser } = useGlobalContext();
   const handleLogout = () => {
       localStorage.removeItem("token");
       logoutUser()
	   navigate('/login')
       window.location.reload();
   };

    return(<nav className={styles.navbar}>
				<h1>CodeQuest</h1>
				<Link to={`/user/${user?.userName}`}>
					<RxAvatar
					size={40}
					className=" ml-[60.5rem]"
					/>
				</Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>)
}
export default Navbar;
