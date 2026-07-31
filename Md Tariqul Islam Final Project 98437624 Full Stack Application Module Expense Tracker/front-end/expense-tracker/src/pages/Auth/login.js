import '../../App.css';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/input';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import Velaris from '../../components/ui/velaris';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null);

    if (!validateEmail(email)){
      setError("Please enter a valid email address!")
      return;
    }

    if (!password){
      setError("Please enter your password!")
      return;
    }

    //calling the login api
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user }= response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("LOGIN ERROR REVEALED:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again!");
      }
    }
  }

  return (
    <Velaris 
      height="100vh" 
      bg="#020617" 
      colors={["#0f172a", "#14b8a6", "#0d9488", "#020617"]}
      className="flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-slate-950/70 backdrop-blur-xl border border-slate-800/60 shadow-2xl rounded-2xl p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-slate-100">Welcome Back</h3>
        <p className="text-sm text-slate-400 mt-2 mb-8">
          Please login to your account
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder='john.doe@example.com'
            type="text"
          />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder='Minimum 8 Characters'
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className='w-full text-sm font-medium text-slate-950 bg-teal-400 shadow-lg shadow-teal-400/20 p-3 rounded-lg mt-4 mb-2 hover:bg-teal-300 transition-colors'>
            Login
          </button>

          <p className="text-sm text-slate-400 mt-4 text-center">
            Don't have an account? {" "}
            <Link className="font-medium text-teal-400 hover:text-teal-300 underline transition-colors" to="/signup">
              Sign Up!
            </Link>
          </p>
        </form>
      </div>
    </Velaris>
  ); 
}

export default Login;