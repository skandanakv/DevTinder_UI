import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:3000/login", {
        email, password
      },{
        withCredentials: true});
      console.log(res.data);
    }catch(err){
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
        </div>

      </div>
    </div>
  </div>
)
}

export default Login