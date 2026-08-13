import "./login.css";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye,EyeOff, FastForward } from "lucide-react";
import Header from "../components/Header/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { login } from "../api/authApi";

export default function Login() {
     const navigate=useNavigate();
     const {checkAuth}=useAuth();


     const [showPassword, setShowPassword] = useState(false);
     const [loading,setLoading]=useState(false);

     const [formData,setFormData]=useState({
      email:"",
      password:""
     });

     const  handleChange=(e)=>{
       setFormData(prev=>({
        ...prev,
        [e.target.name]:e.target.value,
       }))
     }

     const handleSubmit=async (e)=>{
      e.preventDefault();

      const {email,password}=formData;

      if(!email||!password){
        toast.error("please fill all fields");
        return ;
      }

     try{
      setLoading(true);

      const res=await login(formData);

      toast.success(res.data.message||"login successful");

      await checkAuth();

      navigate("/dashboard");

     }catch(err){
      toast.error(err.response?.data?.message||"Login failed");
     }finally{
      setLoading(false);
     }
     }

  return (<>
    <Header buttonText='Sign Up' buttonLink="/signup"/>
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome Back</h1>

        <p>
          Sign in to continue managing your tasks, projects and productivity
          with TaskForge.
        </p>
      </div>

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
/>

{showPassword ? (
    <EyeOff
        size={20}
        className="eye"
        onClick={() => setShowPassword(false)}
    />
) : (
    <Eye
        size={20}
        className="eye"
        onClick={() => setShowPassword(true)}
    />
)}
          </div>

          <div className="login-options">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
       
          <button className="login-btn" type="submit" disabled={loading} >
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

      </div>
    </div>

    </>
  );
}