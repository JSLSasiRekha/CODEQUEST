import styles from "./styles.module.css";
import Allproblems from "../Allproblems/Allproblems";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div >
			<nav className={styles.navbar}>
				<h1>CodeQuest</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className="flex w-[1000px]">
             <Allproblems/>
			</div>
		</div>
	);
};

export default Main;