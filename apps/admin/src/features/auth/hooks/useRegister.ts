import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";

export const useRegister = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});

	const {
		mutate: register,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationKey: ["register"],
		mutationFn: async () => {
			// Clear previous validation errors
			setValidationErrors({});

			// Validate input
			const errors: Record<string, string> = {};
			if (!name.trim()) errors.name = "Full name is required";
			if (!username.trim()) errors.username = "Username is required";
			if (!email.trim()) errors.email = "Email is required";
			if (!password.trim()) errors.password = "Password is required";

			if (Object.keys(errors).length > 0) {
				setValidationErrors(errors);
				throw new Error("Validation failed");
			}

			const res = await api.auth.registerAdmin({
				name: name.trim(),
				username: username.trim().toLowerCase(),
				email: email.trim().toLowerCase(),
				password: password.trim(),
			});
			return res;
		},
		onSuccess: async () => {
			toast.success("Admin account created successfully! Please log in.");
			navigate({ to: "/" });
		},
		onError: (error) => {
			if (error instanceof HTTPError) {
				if (error.response.status === 409) {
					toast.error("Username or email already exists");
				} else if (error.response.status === 400) {
					toast.error("Please fill in all required fields correctly");
				} else {
					toast.error("Failed to create admin account");
				}
			} else if (error.message !== "Validation failed") {
				toast.error("An unexpected error occurred");
			}
		},
	});

	return {
		name,
		setName,
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		register,
		validationErrors,
		isPending,
		isError,
		error,
	};
};
