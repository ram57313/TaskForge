import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({buttonText,buttonLink}) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <h1
        className="logo"
        onClick={() => navigate("/")}
      >
        TaskForge
      </h1>

      <button
        className="nav-btn"
        onClick={() => navigate(buttonLink)}
      >
       {buttonText}
      </button>
    </header>
  );
}