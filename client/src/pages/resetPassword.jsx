import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import toast from "react-hot-toast";

import { resetPassword } from "../api/authApi";

import "./resetPassword.css";


export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();


    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);


    const [formData, setFormData] = useState({

        password: "",

        confirmPassword: ""

    });


    const handleChange = (e) => {

        setFormData(prev => ({

            ...prev,

            [e.target.name]:
                e.target.value

        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        const {
            password,
            confirmPassword
        } = formData;


        if (!password || !confirmPassword) {

            toast.error(
                "Please fill all fields"
            );

            return;

        }


        if (password.length < 8) {

            toast.error(
                "Password must be at least 8 characters"
            );

            return;

        }


        if (password !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }


        try {

            setLoading(true);


            const res = await resetPassword(
                token,
                formData
            );


            toast.success(
                "Password reset successfully"
            );


            /*
             * Backend createSendToken()
             * already sends a new JWT.
             */

            navigate("/dashboard", {
                replace: true
            });

        }

        catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Invalid or expired reset link"
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="reset-page">

            <div className="reset-card">

                <div className="reset-icon">

                    <Lock />

                </div>


                <h1>
                    Reset Password
                </h1>


                <p>
                    Enter your new password below.
                </p>


                <form
                    onSubmit={handleSubmit}
                >


                    {/* PASSWORD */}

                    <div className="reset-input">

                        <Lock size={19} />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="New password"
                            value={
                                formData.password
                            }
                            onChange={handleChange}
                            autoComplete="new-password"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            {showPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }

                        </button>

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="reset-input">

                        <Lock size={19} />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            autoComplete="new-password"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >

                            {showConfirmPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }

                        </button>

                    </div>


                    <button
                        className="reset-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Resetting..."
                            : "Reset Password"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}