import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Dashboard from "./pages/dashboard";
// import Profile from "./pages/profile";
// import Signup from "./pages/signup";
// import Login from "./pages/login";

import Header from "./components/logo/logo";
import AuthLayout from "./components/trials/authLayout";
import { lazy, Suspense } from "react";
import Plasma from "./components/plasma/Plasma";
import MainLayout from "./components/trials/mainLayout";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>....Loading</div>}>
          <Header />
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<MainLayout/>}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
