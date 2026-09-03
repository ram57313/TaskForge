import "./signup.css";

import { signup, guestLogin } from "../api/authApi";

import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Header from "../components/Header/header";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const {checkAuth}=useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await signup(formData);
      
      // console.log(res);

      toast.success(
        res.data.message || "Account created successfully!"
      );
      
      await checkAuth();
      
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);

      const res = await guestLogin();

      // console.log(res)

      toast.success(
        res.data.message || "Welcome, Guest!"
      );
      
      await checkAuth();

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to continue as guest."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header buttonText="Login" buttonLink="/login" />

      <div className="signup-page">
        <div className="signup-left">
          <h1>Start Building Today</h1>

          <p>
            Join TaskForge and organize your tasks,
            manage projects, and boost your productivity
            with one powerful workspace.
          </p>
        </div>

        <div className="signup-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <User size={20} />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
                  onClick={() =>
                    setShowPassword(false)
                  }
                />
              ) : (
                <Eye
                  size={20}
                  className="eye"
                  onClick={() =>
                    setShowPassword(true)
                  }
                />
              )}
            </div>

            <div className="input-box">
              <Lock size={20} />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {showConfirm ? (
                <EyeOff
                  size={20}
                  className="eye"
                  onClick={() =>
                    setShowConfirm(false)
                  }
                />
              ) : (
                <Eye
                  size={20}
                  className="eye"
                  onClick={() =>
                    setShowConfirm(true)
                  }
                />
              )}
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="guest-btn"
              onClick={handleGuestLogin}
              disabled={loading}
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