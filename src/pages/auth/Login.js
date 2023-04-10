import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
 import Loader from '../../components/loader/Loader';
 
const initialState = {
 
  email: "",
  password: "",
 
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
   const [formData, setformData] = useState(initialState);
   const {  email, password } = formData;

   const handleInputChange = (e) => {
    const{name, value}=e.target;
    setformData({...formData,[name]:value})
       };

       const login =  async (e) => {
       e.preventDefault();
       if ( !email || !password) {
        return toast.error("All fields are required..")
       }
       if (!validateEmail(email)) {
        return toast.error("Please enter a valid email..")
       }
       const userData = {
        email, password
      };
setIsLoading(true);
try {
  const data = await loginUser(userData);
  console.log(data);
  await dispatch(SET_LOGIN(true));
  await dispatch(SET_NAME(data.name));
  navigate("/items");
  setIsLoading(false);
} catch (error) {
  setIsLoading(false);
}
       };

  return (
    <>
    <div>
      <div className="h-100 gradient-form py-5" style={{backgroundColor: "#eee"}}>
  <div className="container  h-100">
    {isLoading&& <Loader/>}
    <div className="row d-flex justify-content-center align-items-center h-100">
       
        <div className="card rounded-3 text-black">
        
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="GPN_Logo-GBH.png"
                    style={{width: "185px" }}  alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">GrahakBhandar</h4>
                </div>

                <form onSubmit={login}>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control"
                      placeholder="email address" required name="email" value={email} onChange={handleInputChange}/>
                    <label className="form-label" for="form2Example11">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control"  placeholder="password" required name="password" value={password} onChange={handleInputChange}/>
                    
                    <label className="form-label" for="form2Example22">Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={login}>Log
                      in</button>
                    <Link className="text-muted" to="/forgot">Forgot password?</Link>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <Link type="button" className="btn btn-outline-danger mr-2" to="/"> Home</Link>
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link type="button" className="btn btn-outline-danger ml-2" to="/register"> Register</Link>
                  </div>

                </form>

              </div>
            
          </div>
        </div>
      </div>
    
</div>
    </div>
    </>
  )
}

export default Login
