import "./GuestBanner.css";
import { TriangleAlert, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GuestBanner() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="guest-banner">
      <div className="guest-left">
        <TriangleAlert size={22} />

        <div>
          <h4>Guest Account</h4>

          <p>
            Your account is temporary and all your tasks will be deleted after
            <strong> 24 hours.</strong> Create a free account to keep your data
            forever.
          </p>
        </div>
      </div>

      <div className="guest-right">
        <button
          className="guest-create-btn"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </button>

        <X
          size={20}
          className="guest-close"
          onClick={() => setVisible(false)}
        />
      </div>
    </div>
  );
}