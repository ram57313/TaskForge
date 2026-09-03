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
        Task<span style={{"color":"#2563eb",}}>Forge</span>
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