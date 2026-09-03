import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await getCurrentUser();
            // console.log(res.data.user);
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
            // console.error("🔴Error from checkAuth",err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                checkAuth,
                isLoggedIn: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}