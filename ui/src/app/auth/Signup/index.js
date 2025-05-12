import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/Input/Index";
import LoadingButton from "../../../components/LoadingButton";
import useSignup from "../hooks/useSignup";
import { useAuth } from "../../../context/AuthContext";


const Index = () => {
    let { setUser } = useAuth()
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const { signup, loading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await signup({ name, mobile, email, password });
        setUser(response)
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">

            

          
                <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 shadow-lg rounded-2xl w-96 border border-white/20">

                    <h3 className="text-center font-bold text-white text-2xl">Sign Up</h3>
                    <p className="text-center text-gray-300">Create an account to continue</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <Input required={true} label="Full Name" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your full name" className="bg-white/20 text-white border-white/30" />
                        <Input required={true} label="Mobile Number" onChange={(e) => setMobile(e.target.value)} value={mobile} type="tel" placeholder="Enter your mobile number" className="bg-white/20 text-white border-white/30" />
                        <Input required={true} label="Email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" className="bg-white/20 text-white border-white/30" />
                        <Input required={true} label="Password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/20 text-white border-white/30" />

                        {/* Role Selection */}
                       
                        {/* Signup Button */}
                        <LoadingButton isLoading={loading} label="Sign Up" className="w-full bg-[#00c6ff] text-[#1e3c72] font-semibold py-2 rounded-lg hover:bg-[#00a1e0] transition" />
                    </form>

                    {/* Already have an account? */}
                    <p className="text-center mt-6 text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
        </div>
    );
};

export default Index;
