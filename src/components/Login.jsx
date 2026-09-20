import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {
  const [email, setEmail] = useState('vijay@gmail.com');
  const [password, setPassword] = useState('Vijay@123');
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

return (
  <div className="flex justify-center my-20">
    <div className="card card-dash bg-base-300 w-96 shadow-xl">
      <div className="card-body gap-4">

        <h2 className="card-title justify-center text-2xl">
          Login
        </h2>

        <div>
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
          onClick={handleLogin}>
            Login
          </button>
          <div className="text-red-500 text-center">{err}</div>
        </div>

      </div>
    </div>
  </div>
)
}

export default Login