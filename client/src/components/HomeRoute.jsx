import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LandingPage from "../pages/landingPage";

export default function HomeRoute() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <LandingPage />;
}