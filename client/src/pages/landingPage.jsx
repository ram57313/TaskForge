import "./landingPage.css";
import { useNavigate } from "react-router-dom";


import {Zap,LayoutDashboard,ShieldCheck,ArrowRight} from "lucide-react";
import Header from "../components/Header/header";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Header buttonText="Login" buttonLink="/login"/>

      <section className="hero">
        <h1>
          Forge Better Habits.
          <br />
          Build Extraordinary Results.
        </h1>

        <p>
          A modern productivity workspace to manage tasks, organize projects and
          accomplish your goals faster.
        </p>

        <div className="buttons">
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              document
                .getElementById("features")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      <section id="features" className="features">
        <div className="card">
          <div className="card-icon">
                <Zap size={34} strokeWidth={1.8} />
        </div>

            <h3>Lightning Fast</h3>

            <p>
                Optimized for speed with smooth interactions.
            </p>
        </div>

        <div className="card">
          <div className="card-icon">
            <LayoutDashboard size={34} strokeWidth={1.8}/>
        </div>

          <h3>Smart Organization</h3>
          <p>
            Organize your tasks
          </p>
        </div>

        <div className="card">
          <div className="card-icon">
                <ShieldCheck size={34} strokeWidth={1.8}/>
            </div>

            <h3>Secure Workspace</h3>

            <p>Your own workingspace</p>
        </div>
      </section>

      <footer>© 2026 TaskForge</footer>
    </div>
  );
}

export default LandingPage;
