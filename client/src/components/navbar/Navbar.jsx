import {Link} from 'react-router-dom'
import styles from "./styles.module.css";
import { RxAvatar } from "react-icons/rx";
import { useGlobalContext } from "../../context.jsx"

const Navbar=()=>{
    const {user, logoutUser } = useGlobalContext();
    console.log(user);
   const handleLogout = () => {
       localStorage.removeItem("token");
       logoutUser()
       window.location.reload();
   };

    return(<nav className={styles.navbar}>
				<h1>CodeQuest</h1>
				<Link to={`/user/${user?._id}`}>
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
