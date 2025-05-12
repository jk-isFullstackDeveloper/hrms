import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input/Index";
import LoadingButton from "../../../components/LoadingButton";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API request delay
        setTimeout(() => {
            setLoading(false);
            alert("A password reset link has been sent to your email!");
        }, 2000);
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
          
        >
            <div
                className="card p-4 shadow-lg border-0"
                style={{
                    width: "380px",
                    borderRadius: "10px",
                    background: "#fff",
                }}
            >
                <h3 className="text-center fw-bold text-dark mb-2">Forgot Password?</h3>
                <p className="text-center text-muted">
                    Enter your email, and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="mt-3">
                    {/* Email Input */}
                    <div className="mb-3">
                        <Input
                            label="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Reset Password Button */}
                    <LoadingButton
                        isLoading={loading}
                        label="Send Reset Link"
                        className="btn w-100 fw-bold py-2"
                        style={{
                            backgroundColor: "#4A90E2",
                            color: "#fff",
                            borderRadius: "6px",
                            transition: "0.3s",
                        }}
                    />
                </form>

                {/* Back to Login */}
                <p className="text-center mt-3">
                    <Link
                        to="/login"
                        className="text-decoration-none fw-bold"
                        style={{ color: "#4A90E2" }}
                    >
                        ← Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
