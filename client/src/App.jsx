import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

import DeletedTasks from "./pages/DeletedTasks";
import Settings from "./pages/Settings";

import HomeRoute from "./components/HomeRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ArchivedTasks from "./pages/ArchivedTasks";

import MainLayout from "./layouts/MainLayout";

import { useAuth } from "./context/AuthContext";

function App() {

    const { loading } = useAuth();

    if (loading) {

        return <div>Loading...</div>;

    }

    return (

        <Routes>

            {/* ---------------- PUBLIC ROUTES ---------------- */}

            <Route
                path="/"
                element={<HomeRoute />}
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/signup"
                element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                }
            />


            {/* ---------------- PROTECTED ROUTES ---------------- */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/deleted"
                    element={<DeletedTasks />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route 
                path="/archived" 
                element={<ArchivedTasks/>}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

            <Route
    path="/forgot-password"
    element={
        <PublicRoute>
            <ForgotPassword />
        </PublicRoute>
    }
/>

<Route
    path="/reset-password/:token"
    element={
        <PublicRoute>
            <ResetPassword />
        </PublicRoute>
    }
/>


        </Routes>

    );

}

export default App;