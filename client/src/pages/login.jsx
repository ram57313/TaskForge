import "./login.css";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye,EyeOff, FastForward } from "lucide-react";
import Header from "../components/Header/header";
import { useState } from "react";

export default function Login() {
     const [showPassword, setShowPassword] = useState(false);
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

        <form>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
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

          <button className="login-btn">
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