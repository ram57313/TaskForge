import "./signup.css";

import { signup } from "../api/authApi";

import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Header from "../components/Header/header";
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Header buttonText="Login" buttonLink="/login" />

      <div className="signup-page">

        <div className="signup-left">

          <h1>Start Building Today</h1>

          <p>
            Join TaskForge and organize your tasks, manage projects,
            and boost your productivity with one powerful workspace.
          </p>

        </div>

        <div className="signup-card">

          <h2>Create Account</h2>

          <form>

            <div className="input-box">
              <User size={20} />
              <input
                type="text"
                placeholder="Full Name"
              />
            </div>

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

            <div className="input-box">

              <Lock size={20} />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
              />

              {showConfirm ? (
                <EyeOff
                  size={20}
                  className="eye"
                  onClick={() => setShowConfirm(false)}
                />
              ) : (
                <Eye
                  size={20}
                  className="eye"
                  onClick={() => setShowConfirm(true)}
                />
              )}

            </div>

            <button className="signup-btn">
              Create Account
            </button>

            <div className="divider">
                <span>OR</span>
            </div>

    <button
    type="button"
    className="guest-btn"
    // onClick={handleGuestSignup}
    >
    Continue as Guest
    </button>

          </form>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>
    </>
  );
}