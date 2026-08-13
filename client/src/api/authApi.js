import api from "./axios";


// ================= SIGNUP =================

export const signup = async (userData) => {

    return await api.post(
        "/users/signup",
        userData,
        {
            withCredentials: true
        }
    );

};


// ================= LOGIN =================

export const login = async (userData) => {

    return await api.post(
        "/users/login",
        userData
    );

};


// ================= GUEST LOGIN =================

export const guestLogin = async () => {

    return await api.post(
        "/users/guest-login",
        {
            withCredentials: true
        }
    );

};


// ================= LOGOUT =================

export const logout = async () => {

    return await api.post(
        "/users/logout"
    );

};


// ================= CURRENT USER =================

export const getCurrentUser = async () => {

    return await api.get(
        "/users/me",
        {
            withCredentials: true
        }
    );

};


// ================= UPDATE PROFILE =================

export const updateMe = async (userData) => {

    return await api.patch(
        "/users/updateMe",
        userData
    );

};


// ================= DELETE ACCOUNT =================

export const deleteMe = async () => {

    return await api.patch(
        "/users/deleteMe"
    );

};

// Change Password

export const updatePassword = async (passwordData) => {

    return await api.post(
        "/users/updatePassword",
        passwordData
    );

};

// Forgot Password

export const forgotPassword = async (email) => {

    return await api.post(
        "/users/forgotPassword",
        {
            email
        }
    );

};


// Reset Password

export const resetPassword = async (
    token,
    passwordData
) => {

    return await api.patch(
        `/users/resetPassword/${token}`,
        passwordData
    );

};