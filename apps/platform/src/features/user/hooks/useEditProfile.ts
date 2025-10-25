import type { UserUpdate, UserUpdateWithFile } from "@opencircle/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../utils/api";
import { useAccount } from "../../auth/hooks/useAccount";

export const useEditProfile = () => {
	const { account, isAccountLoading, isAccountError, accountError } =
		useAccount();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [formData, setFormData] = useState<UserUpdateWithFile>({
		name: "",
		bio: "",
		avatar_url: undefined,
	});
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	useEffect(() => {
		if (account) {
			setFormData({
				name: account.name || "",
				bio: account.bio || "",
				avatar_url: account.avatar_url || undefined,
			});
		}
	}, [account]);

	const updateMutation = useMutation({
		mutationFn: async () => {
			if (account) {
				if (avatarFile) {
					const dataWithoutUrl = { ...formData, avatar_url: undefined };
					return await api.users.updateWithFile(
						account.id,
						dataWithoutUrl,
						avatarFile,
					);
				} else {
					return await api.users.update(account.id, formData as UserUpdate);
				}
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["account"] });
			navigate({ to: "/" });
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateMutation.mutate();
	};

	const handleChange = (field: keyof UserUpdateWithFile, value: string) => {
		setFormData((prev: UserUpdateWithFile) => ({ ...prev, [field]: value }));
	};

	const handleUpload = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			const reader = new FileReader();
			reader.onload = () => {
				setFormData((prev: UserUpdateWithFile) => ({
					...prev,
					avatar_url: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	return {
		account,
		isAccountLoading,
		isAccountError,
		accountError,
		formData,
		avatarFile,
		updateMutation,
		fileInputRef,
		handleSubmit,
		handleChange,
		handleUpload,
		handleFileChange,
	};
};
