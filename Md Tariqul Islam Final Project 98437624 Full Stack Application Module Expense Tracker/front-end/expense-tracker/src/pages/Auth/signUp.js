
import '../../App.css';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/helper';




function SignUp() {

const [profilePic, setProfilePic]= useState(null);
const [fullName, setFullName]= useState("");
const [email, setEmail]= useState("");
const [password, setPassword]=useState("");

const [error, setError] = useState(null);

const navigate=useNavigate();


//handle signup submit

const handleSignUp = async(e)=>{

}


  return (
    
      <AuthLayout>
      
      </AuthLayout>

  );
}

export default SignUp;
