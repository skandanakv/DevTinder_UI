import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
       await axios.post(BASE_URL + "logout", {
        withCredentials: true
      });

      dispatch(removeUser());
      return navigate("/login");

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>

      <div className="flex gap-2">

        {user && (
          <div className="dropdown dropdown-end mx-5">

            <div className="flex items-center gap-3">

              <p className="text-sm text-base-content/70">
                Welcome back,{" "}
                <span className="font-medium text-base-content">
                  {user.firstName}
                </span>
              </p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={user.photoUrl}
                  />
                </div>
              </div>

            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>

          </div>
        )}

      </div>
    </div>
  )
}

export default NavBar