import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Index";
import LoadingButton from "../../../components/LoadingButton";
import { useAuth } from "../../../context/AuthContext";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const { login, loading } = useLogin()

    const navigate = useNavigate();
    const [email, setEmail] = useState("jk@gmail.com");
    const [password, setPassword] = useState("123456");
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let {data=null} = await login({ email, password })
        setUser(data);
        navigate("/admin/dashboard");
    };
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">
 
            {/* Login Form Container */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 shadow-lg rounded-2xl w-96 border border-white/20">
                <h3 className="text-center font-bold text-white text-3xl">Welcome Back</h3>
                <p className="text-center text-gray-300">Sign in to continue</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <Input
                        required={true}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-white/20 text-white border border-white/40 focus:ring-2 focus:ring-yellow-400"
                    />
                    <Input
                        required={true}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/20 text-white border border-white/40 focus:ring-2 focus:ring-yellow-400"
                    />
                    <div className="flex justify-between items-center text-gray-300 text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-yellow-400" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="hover:underline text-yellow-300">
                            Forgot Password?
                        </Link>
                    </div>
                    <LoadingButton
                        isLoading={loading}
                        label="Login"
                        className="w-full bg-[#facc15] text-[#1e3a8a] font-semibold py-2 rounded-lg hover:bg-[#fbbf24] transition"
                    />
                </form>
                <p className="text-center mt-6 text-gray-300">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-yellow-300 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
