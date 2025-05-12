import { useState } from "react";
import { signupApi } from "../../../api/auth"

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await signupApi(userData);
            return data;  
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};

export default useSignup;
