import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {url} from "../../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
	const [data, setData] = useState({
		userName:"",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	  };
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(data)
			
			const fetchedData = await axios.post( `${url}/api/users`, data);
			console.log(fetchedData)
			navigate("/login");
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="User Name"
							name="userName"
							onChange={handleChange}
							value={data.userName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						 <input
							type={passwordVisible ? "text" : "password"}
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={handleChange}
							required
							className={styles.input}
						/>
						<FontAwesomeIcon
							icon={passwordVisible ? faEyeSlash : faEye}
							onClick={togglePasswordVisibility}
							className='ml-64 -mt-9 mb-4'
							
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;