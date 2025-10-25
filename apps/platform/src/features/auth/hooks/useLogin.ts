import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";
export const useLogin = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const {
		mutate: login,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationKey: ["login"],
		mutationFn: async () => {
			const res = await api.auth.login({ username, password });
			return res;
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.access_token);
			navigate({ to: "/" });
		},
		onError: (error) => {
			if (error instanceof HTTPError && error.response.status === 401) {
				toast.error("Invalid username or password");
			}
		},
	});

	return {
		username,
		setUsername,
		password,
		setPassword,
		login,
		isPending,
		isError,
		error,
	};
};
