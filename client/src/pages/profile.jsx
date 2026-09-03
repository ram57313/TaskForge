import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FiUser,
    FiMail,
    FiEdit2,
    FiSave,
    FiX,
    FiTrash2,
     FiLock,
    FiKey,
    FiEye,
    FiEyeOff
} from "react-icons/fi";

import "./profile.css";

import {
    updateMe,
    deleteMe,
    updatePassword
} from "../api/authApi";

import { useAuth } from "../context/AuthContext";


const Profile = () => {

    const {
        user,
        setUser
    } = useAuth();

    const navigate = useNavigate();


    const [isEditing, setIsEditing] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState(
        user?.name || ""
    );

    const [email, setEmail] = useState(
        user?.email || ""
    );

    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [passwordData, setPasswordData] = useState({
        passwordCurrent: "",
        password: "",
        confirmPassword: ""
    });

    const [changingPassword, setChangingPassword] = useState(false);
    // ================= EDIT =================

    const handleEdit = () => {

        setName(user?.name || "");

        setEmail(user?.email || "");

        setIsEditing(true);

    };


    // ================= CANCEL =================

    const handleCancel = () => {

        setName(user?.name || "");

        setEmail(user?.email || "");

        setIsEditing(false);

    };


    // ================= SAVE =================

    const handleSave = async (e) => {

        e.preventDefault();

        if (!name.trim()) {

            toast.error(
                "Name cannot be empty"
            );

            return;

        }

        if (!email.trim()) {

            toast.error(
                "Email cannot be empty"
            );

            return;

        }


        try {

            setSaving(true);

            const res = await updateMe({

                name: name.trim(),

                email: email.trim()

            });


            setUser(res.data.user);

            setIsEditing(false);

            toast.success(
                "Profile updated successfully"
            );

        }

        catch (err) {

            // console.error(err);

            toast.error(
                err?.response?.data?.message ||
                "Unable to update profile"
            );

        }

        finally {

            setSaving(false);

        }

    };

    const handlePasswordChange = (e) => {

    setPasswordData({
        ...passwordData,
        [e.target.name]: e.target.value
    });

};


const handlePasswordSubmit = async (e) => {

    e.preventDefault();

    if (
        !passwordData.passwordCurrent ||
        !passwordData.password ||
        !passwordData.confirmPassword
    ) {

        toast.error(
            "Please fill all password fields"
        );

        return;

    }

    if (passwordData.password.length < 8) {

        toast.error(
            "New password must be at least 8 characters"
        );

        return;

    }

    if (
        passwordData.password !==
        passwordData.confirmPassword
    ) {

        toast.error(
            "New passwords do not match"
        );

        return;

    }


    try {

        setChangingPassword(true);

        const res = await updatePassword(
            passwordData
        );

        /*
         * updatePassword uses createSendToken()
         * so the backend sends a fresh JWT.
         */

        if (res.data?.user) {

            setUser(res.data.user);

        }

        setPasswordData({
            passwordCurrent: "",
            password: "",
            confirmPassword: ""
        });

        setShowPasswordForm(false);

        toast.success(
            "Password changed successfully"
        );

    }
    catch (err) {

        // console.error(err);

        toast.error(
            err?.response?.data?.message ||
            "Unable to change password"
        );

    }
    finally {

        setChangingPassword(false);

    }

};


    // ================= DELETE ACCOUNT =================

    const handleDeleteAccount = () => {

    setShowDeleteConfirm(true);

};

const handleDeleteAccountConfirm = async () => {

    try {

        setDeleting(true);

        await deleteMe();

        setUser(null);

        toast.success(
            "Your account has been deleted successfully"
        );

        navigate("/login", {
            replace: true
        });

    }
    catch (err) {

        // console.error(err);

        toast.error(
            err?.response?.data?.message ||
            "Unable to Delete account"
        );

    }
    finally {

        setDeleting(false);

    }

};


    if (!user) {

        return null;

    }


    return (

        <section className="profile-page">


            {/* ================= HEADER ================= */}

            <div className="profile-header">

                <div>

                    <h1>
                        Profile
                    </h1>

                    <p>
                        Manage your TaskForge account.
                    </p>

                </div>


                <div className="profile-avatar">

                    {user.name
                        ?.charAt(0)
                        .toUpperCase()
                    }

                </div>

            </div>


            {/* ================= PROFILE CARD ================= */}

            <div className="profile-card">


                {/* ACCOUNT INFO */}

                <div className="profile-card-header">

                    <div>

                        <h2>
                            Account Information
                        </h2>

                        <p>
                            Your basic account details.
                        </p>

                    </div>


                    {!user.isGuest&&!isEditing && (

                        <button
                            className="profile-edit-btn"
                            onClick={handleEdit}
                            type="button"
                        >

                            <FiEdit2 />

                            <span>
                                Edit
                            </span>

                        </button>

                    )}

                </div>


                {/* FORM */}

                <form
                    className="profile-form"
                    onSubmit={handleSave}
                >


                    {/* NAME */}

                    <div className="profile-field">

                        <label>

                            <FiUser />

                            Name

                        </label>


                        {isEditing ? (

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                autoComplete="name"
                            />

                        ) : (

                            <div className="profile-value">

                                {user.name}

                            </div>

                        )}

                    </div>


                    {/* EMAIL */}

                    <div className="profile-field">

                        <label>

                            <FiMail />

                            Email

                        </label>


                        {isEditing ? (

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                autoComplete="email"
                            />

                        ) : (

                            <div className="profile-value">

                                {user.email}

                            </div>

                        )}

                    </div>


                    {/* ACCOUNT TYPE */}

                    <div className="profile-field">

                        <label>

                            Account Type

                        </label>

                        <div className="profile-value">

                            <span className="account-badge">

                                {user.isGuest
                                    ? "Guest Account"
                                    : "Regular Account"
                                }

                            </span>

                        </div>

                    </div>


                    {/* EDIT ACTIONS */}

                    {isEditing && (

                        <div className="profile-form-actions">

                            <button
                                type="button"
                                className="profile-cancel-btn"
                                onClick={handleCancel}
                                disabled={saving}
                            >

                                <FiX />

                                Cancel

                            </button>


                            <button
                                type="submit"
                                className="profile-save-btn"
                                disabled={saving}
                            >

                                <FiSave />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"
                                }

                            </button>

                        </div>

                    )}

                </form>

            </div>

           {!user.isGuest&&(<div className="password-card">

    <div className="password-card-header">

        <div>

            <h2>
                Password
            </h2>

            <p>
                Change your account password.
            </p>

        </div>

        <FiLock className="password-icon" />

    </div>


    {!showPasswordForm ? (

        <button
            type="button"
            className="change-password-btn"
            onClick={() =>
                setShowPasswordForm(true)
            }
        >

            <FiKey />

            Change Password

        </button>

    ) : (

        <form
            className="password-form"
            onSubmit={handlePasswordSubmit}
        >

            <div className="profile-field">

                <label>
                    Current Password
                </label>

               <div className="password-input-wrapper">

                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="passwordCurrent"
                        value={passwordData.passwordCurrent}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                    />

                    <button
                        type="button"
                        className="password-eye-btn"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                        aria-label={
                            showCurrentPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >

                        {showCurrentPassword
                            ? <FiEyeOff />
                            : <FiEye />
                        }

                    </button>

            </div>

            </div>


            <div className="profile-field">

                <label>
                    New Password
                </label>

                <div className="password-input-wrapper">

    <input
        type={showNewPassword ? "text" : "password"}
        name="password"
        value={passwordData.password}
        onChange={handlePasswordChange}
        autoComplete="new-password"
    />

    <button
        type="button"
        className="password-eye-btn"
        onClick={() =>
            setShowNewPassword(!showNewPassword)
        }
        aria-label={
            showNewPassword
                ? "Hide password"
                : "Show password"
        }
    >

        {showNewPassword
            ? <FiEyeOff />
            : <FiEye />
        }

    </button>

</div>

            </div>


            <div className="profile-field">

                <label>
                    Confirm New Password
                </label>
          
                <div className="password-input-wrapper">

    <input
        type={
            showConfirmPassword
                ? "text"
                : "password"
        }
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        autoComplete="new-password"
    />

    <button
        type="button"
        className="password-eye-btn"
        onClick={() =>
            setShowConfirmPassword(
                !showConfirmPassword
            )
        }
        aria-label={
            showConfirmPassword
                ? "Hide password"
                : "Show password"
        }
    >

        {showConfirmPassword
            ? <FiEyeOff />
            : <FiEye />
        }

    </button>

</div>

            </div>


            <div className="password-actions">

                <button
                    type="button"
                    className="profile-cancel-btn"
                    onClick={() => {

                        setShowPasswordForm(false);
                        setShowNewPassword(false);
                        setShowConfirmPassword(false);
                        setShowCurrentPassword(false);

                        setPasswordData({
                            passwordCurrent: "",
                            password: "",
                            confirmPassword: ""
                        });

                    }}
                    disabled={changingPassword}
                >

                    <FiX />

                    Cancel

                </button>


                <button
                    type="submit"
                    className="profile-save-btn"
                    disabled={changingPassword}
                >

                    <FiKey />

                    {changingPassword
                        ? "Changing..."
                        : "Change Password"
                    }

                </button>

            </div>

        </form>

    )}

</div>)     
           } 


            {/* ================= DANGER ZONE ================= */}

            <div className="danger-card">

                <div>

                    <h2>
                        Delete Account
                    </h2>

                    <p>

                        Delete your account and
                        sign out of TaskForge.

                    </p>

                </div>


                <button
                    className="delete-account-btn"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    type="button"
                >

                    <FiTrash2 />

                    {deleting
                        ? "Deleting..."
                        : "Delete Account"
                    }

                </button>

            </div>
            {showDeleteConfirm && (

                    <div
                        className="confirm-overlay"
                        onClick={() => setShowDeleteConfirm(false)}
                    >

                        <div
                            className="confirm-modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="confirm-icon">

                                <FiTrash2 />

                            </div>

                            {/* <div className="deactivate-content"> */}

                                <h2>
                                    Delete Account?
                                </h2>

                                <p>
                                    Your account will be deleted permanently 
                                    
                                </p>
                                
                            {/* </div> */}


                            <div className="confirm-actions">

                                <button
                                    type="button"
                                    className="confirm-cancel-btn"
                                    onClick={() =>
                                        setShowDeleteConfirm(false)
                                    }
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="confirm-delete-btn"
                                    onClick={async () => {

                                        setShowDeleteConfirm(false);

                                        await handleDeleteAccountConfirm();

                                    }}
                                    disabled={deleting}
                                >

                                    {deleting
                                        ? "Deleting...."
                                        : "Delete"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )}


        </section>

    );

};

export default Profile;