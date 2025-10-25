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
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [inviteCode, setInviteCode] = useState("");

	const {
		mutate: register,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationKey: ["register"],
		mutationFn: async () => {
			const res = await api.auth.register({
				name,
				username,
				password,
				email,
				invite_code: inviteCode || undefined,
			});
			return res;
		},
		onSuccess: () => {
			navigate({ to: "/" });
		},
		onError: (error) => {
			if (error instanceof HTTPError && error.response.status === 409) {
				toast.error("Username or email already exists");
			} else if (error instanceof HTTPError && error.response.status === 400) {
				toast.error("Invalid registration data");
			}
		},
	});

	return {
		name,
		setName,
		username,
		setUsername,
		password,
		setPassword,
		email,
		setEmail,
		inviteCode,
		setInviteCode,
		register,
		isPending,
		isError,
		error,
	};
};
