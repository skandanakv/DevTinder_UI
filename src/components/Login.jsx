import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {
  const [email, setEmail] = useState('vijay@gmail.com');
  const [password, setPassword] = useState('Vijay@123');
  const [firstName, setFirstName] = useState('Vijay');
  const [lastName, setLastName] = useState('Kumar');
  const[IsLoginForm, setIsLoginForm] = useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const[err,setErr]=useState('');

  const handleLogin = async () => {
    try{
    const res = await axios.post(BASE_URL + "login", {
  email,
  password
}, {
  withCredentials: true
});
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    }catch(err){
      setErr(err.response.data);
      console.log(err);
      
    }
  }; 


  const handleSignUp=async()=>{
    try{
      const res = await axios.post(BASE_URL + "signup", {
        firstName,
        lastName,
        email,
        password
      }, {
        withCredentials: true
      });
      
      dispatch(addUser(res.data.data));
      navigate("/profile");

    }catch(err){
      setErr(err.response.data);
      console.log(err);
    }
  }

return (
  <div className="flex justify-center my-20">
    <div className="card card-dash bg-base-300 w-96 shadow-xl">
      <div className="card-body gap-4">

        <h2 className="card-title justify-center text-2xl">
          {IsLoginForm ? "Login" : "Sign Up"}
        </h2>

        <div>
{ !IsLoginForm && <>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input w-full"
              placeholder="Enter your first name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input w-full"
              placeholder="Enter your last name"
            />
          </fieldset>
          </>
          }
          
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full"
              placeholder="Enter your email"
            />
          </fieldset>
          

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="Enter your password"
            />
          </fieldset>
        </div>

        <div className="card-actions justify-center mt-2">
          <button className="btn btn-primary w-full "
          onClick={IsLoginForm? handleLogin : handleSignUp}>
            {IsLoginForm ? "Login" : "Sign Up"}
          </button>
          <div className="text-red-500 text-center">{err}</div>
        </div>

        <div className="">{IsLoginForm ? "Don't have an account?" : "Already have an account?"} <button className="btn btn-link" onClick={() => setIsLoginForm(!IsLoginForm)}>{IsLoginForm ? "Sign Up" : "Login"}</button></div>

      </div>
    </div>
  </div>
)
}

export default Login