import api from "./axios";

// Signup
export const signup = async (userData) => {
  return await api.post("/users/signup", userData);
};

// Login
export const login = async (userData) => {
  return await api.post("/users/login", userData);
};

// Guest Login
export const guestLogin = async () => {
  return await api.post("/users/guest-login");
};

// Logout
export const logout = async () => {
  return await api.post("/users/logout");
};

// Current User
// export const getCurrentUser = async () => {
//   return await api.get("/users/me");
// };