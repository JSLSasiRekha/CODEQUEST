import { useState } from 'react';
import axios from "axios";
import styles from "./styles.module.css";
import { url } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context"; // Adjust path as per your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { saveUser } = useGlobalContext();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const response = await axios.post(`${url}/api/auth/login`, data, { withCredentials: true });
      console.log(response);
      const { user, token } = response.data;
      saveUser(user); // Save user data to global context
      console.log(user); // Log user data
      console.log(token); // Log token
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
          <p className='text-5xl text-center mb-8 text-[#3bb19b] font-bold'>CODE QUEST</p>
            <h1 className='mb-6'>Login </h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <div className='-ml-5'>
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
                className='-ml-9'
              />
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
