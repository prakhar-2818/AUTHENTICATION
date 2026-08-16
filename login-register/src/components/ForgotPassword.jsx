import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ForgotPassword.css";

function ForgotPassword({ goToLogin, goToRegister }) {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    // ========================================
    // SEND OTP
    // ========================================

    const sendOTP = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Generate 6 digit OTP
        const generatedOTP = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        try {
            // First check account and save OTP in MongoDB
            const backendResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: generatedOTP
                    })
                }
            );

            const backendData =
                await backendResponse.json();

            if (!backendResponse.ok) {
                alert(backendData.message);
                return;
            }

            // Then send the same OTP through EmailJS
            const templateParams = {
                email: email,
                passcode: generatedOTP,
                time: "5 minutes"
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                {
                    publicKey:
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                }
            );

            alert("OTP sent successfully!");

            setStep(2);

        } catch (error) {
            console.error("OTP ERROR:", error);

            alert("Failed to send OTP.");

        } finally {
            setLoading(false);
        }
    };


    // ========================================
    // VERIFY OTP
    // ========================================

    const verifyOTP = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("OTP verified successfully!");

            setStep(3);

        } catch (error) {
            console.error(error);

            alert(
                "Cannot connect to backend."
            );
        }
    };


    // ========================================
    // RESET PASSWORD
    // ========================================

    const resetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            alert(
                "Password must be at least 6 characters."
            );
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp,
                        newPassword: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert(
                "Password reset successfully!"
            );

            goToLogin();

        } catch (error) {
            console.error(error);

            alert(
                "Cannot connect to backend."
            );
        }
    };


    return (
        <div className="forgot-container">

            <div className="forgot-box">

                {/* STEP 1 */}

                {step === 1 && (
                    <>
                        <h1>Forgot Password?</h1>

                        <p className="forgot-text">
                            Enter your registered email
                        </p>

                        <form onSubmit={sendOTP}>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send OTP"}
                            </button>

                        </form>

                        <p>
                            Don't have an account?

                            <span
                                onClick={goToRegister}
                            >
                                {" "}Create Account
                            </span>
                        </p>
                    </>
                )}


                {/* STEP 2 */}

                {step === 2 && (
                    <>
                        <h1>Verify OTP</h1>

                        <p className="forgot-text">
                            OTP sent to
                            <br />
                            <b>{email}</b>
                        </p>

                        <form onSubmit={verifyOTP}>

                            <input
                                type="text"
                                placeholder="Enter 6 digit OTP"
                                maxLength="6"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value)
                                }
                                required
                            />

                            <button type="submit">
                                Verify OTP
                            </button>

                        </form>
                    </>
                )}


                {/* STEP 3 */}

                {step === 3 && (
                    <>
                        <h1>Reset Password</h1>

                        <p className="forgot-text">
                            Create your new password
                        </p>

                        <form onSubmit={resetPassword}>

                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                            <button type="submit">
                                Reset Password
                            </button>

                        </form>
                    </>
                )}

                <p
                    className="login-link"
                    onClick={goToLogin}
                >
                    Back to Login
                </p>

            </div>

        </div>
    );
}

export default ForgotPassword;