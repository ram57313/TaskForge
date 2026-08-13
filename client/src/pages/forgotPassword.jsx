import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { forgotPassword } from "../api/authApi";

import "./forgotPassword.css";


export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [sent, setSent] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!email.trim()) {

            toast.error(
                "Please enter your email"
            );

            return;

        }


        try {

            setLoading(true);


            const res = await forgotPassword(
                email.trim()
            );


            toast.success(
                res.data.message ||
                "Reset link sent"
            );


            setSent(true);

        }

        catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to send reset link"
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="forgot-page">

            <div className="forgot-card">

                {!sent ? (

                    <>

                        <div className="forgot-icon">

                            <Mail />

                        </div>


                        <h1>
                            Forgot Password?
                        </h1>


                        <p>
                            Enter your email address and
                            we'll send you a link to reset
                            your password.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="forgot-input">

                                <Mail size={19} />

                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    autoComplete="email"
                                />

                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Sending..."
                                    : "Send Reset Link"
                                }

                            </button>

                        </form>


                        <Link
                            to="/login"
                            className="back-login"
                        >

                            <ArrowLeft size={17} />

                            Back to Login

                        </Link>

                    </>

                ) : (

                    <>

                        <div className="forgot-icon">

                            <Mail />

                        </div>


                        <h1>
                            Check Your Email
                        </h1>


                        <p>

                            We've sent a password reset
                            link to:

                        </p>


                        <strong>
                            {email}
                        </strong>


                        <p>

                            The link will expire shortly.
                            If you don't see the email,
                            check your spam folder.

                        </p>


                        <Link
                            to="/login"
                            className="back-login"
                        >

                            <ArrowLeft size={17} />

                            Back to Login

                        </Link>

                    </>

                )}

            </div>

        </div>

    );

}