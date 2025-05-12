import { useState } from "react";
import { loginApi } from "../../../api/auth"; // make sure this exists

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginApi(credentials);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
