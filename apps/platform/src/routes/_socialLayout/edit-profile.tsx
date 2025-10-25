import { Avatar, Button, Input } from "@opencircle/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../components/header";
import { useEditProfile } from "../../features/user/hooks/useEditProfile";

export const Route = createFileRoute("/_socialLayout/edit-profile")({
	component: EditProfile,
});

function EditProfile() {
	const {
		account,
		isAccountLoading,
		isAccountError,
		accountError,
		formData,
		updateMutation,
		fileInputRef,
		handleSubmit,
		handleChange,
		handleUpload,
		handleFileChange,
	} = useEditProfile();

	if (isAccountLoading) {
		return <div>Loading...</div>;
	}

	if (isAccountError || !account) {
		return (
			<div>
				Error loading account: {accountError?.message || "Account not found"}
			</div>
		);
	}

	return (
		<main>
			<Header label="Back" />
			<section className="flex flex-col items-center py-12 space-y-4">
				<div className="flex flex-col items-center space-y-2">
					<Avatar
						size="xl"
						initials={account.name?.charAt(0).toUpperCase() || ""}
						image_url={formData.avatar_url || ""}
					/>
					<Button onClick={handleUpload} variant="secondary" size="sm">
						{updateMutation.isPending ? "Uploading..." : "Change Avatar"}
					</Button>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
					/>
				</div>
				<h1 className="text-xl font-semibold">Edit Profile</h1>
				<form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
					<Input
						value={formData.name}
						onChange={(e) => handleChange("name", e.target.value)}
						placeholder="Name"
					/>
					<textarea
						value={formData.bio}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							handleChange("bio", e.target.value)
						}
						placeholder="Bio"
						className="w-full p-2 border border-border rounded-md bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
						rows={4}
					/>

					<Button type="submit" disabled={updateMutation.isPending}>
						{updateMutation.isPending ? "Saving..." : "Save"}
					</Button>
				</form>
			</section>
		</main>
	);
}
