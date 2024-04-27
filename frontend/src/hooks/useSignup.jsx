import { useState } from "react";
import toast from 'react-hot-toast';

const useSignup = () => {
	const [loading, setLoading] = useState(false);

    const signup = async({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
            
        //once the above things is success we will get the data
        const data = await res.json();
        console.log(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    //inside this singup hook we have to return loading state and the function
    return {loading, signup}

}

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

    //here check for the password in frontend and we have implemented functionality in the backend 
	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}