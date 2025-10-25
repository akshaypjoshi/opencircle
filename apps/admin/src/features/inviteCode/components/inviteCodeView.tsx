import { Button } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useInviteCode } from "../hooks/useInviteCode";

interface InviteCodeViewProps {
	id: string;
	onEdit?: () => void;
	onDelete?: () => void;
}

export const InviteCodeView = ({
	id,
	onEdit,
	onDelete,
}: InviteCodeViewProps) => {
	const { inviteCode, isLoading, deleteInviteCode, isDeleting } =
		useInviteCode(id);

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this invite code?")) {
			try {
				await deleteInviteCode(id);
				if (onDelete) onDelete();
			} catch (error) {
				console.error("Failed to delete invite code:", error);
			}
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border"></div>
			</div>
		);
	}

	if (!inviteCode) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500 mb-4">Invite code not found</p>
				<Link to="/invite-codes">
					<Button>Back to Invite Codes</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-4">
					<Link to="/invite-codes">
						<Button variant="secondary" size="sm">
							<ArrowLeft size={16} className="mr-2" />
							Back
						</Button>
					</Link>
					<h1 className="text-3xl font-bold">Invite Code Details</h1>
				</div>
				<div className="flex gap-2">
					{onEdit && (
						<Button variant="secondary" onClick={onEdit}>
							<Edit size={16} className="mr-2" />
							Edit
						</Button>
					)}
					{onDelete && (
						<Button
							variant="secondary"
							onClick={handleDelete}
							disabled={isDeleting}
						>
							<Trash2 size={16} className="mr-2" />
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
					)}
				</div>
			</div>

			<div className="bg-white border border-border rounded-lg p-6 space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">Code</h3>
						<p className="font-mono text-lg bg-gray-50 p-3 rounded border">
							{inviteCode.code}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
						<div className="flex items-center gap-2">
							<span
								className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${
									inviteCode.status === "active"
										? "bg-green-100 text-green-800"
										: inviteCode.status === "used"
											? "bg-red-100 text-red-800"
											: "bg-gray-100 text-gray-800"
								}`}
							>
								{inviteCode.status}
							</span>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">Usage</h3>
						<p className="text-lg">
							{inviteCode.used_count} /{" "}
							{inviteCode.max_uses === 0 ? "Unlimited" : inviteCode.max_uses}
						</p>
						{inviteCode.max_uses > 0 && (
							<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{
										width: `${Math.min(
											(inviteCode.used_count / inviteCode.max_uses) * 100,
											100,
										)}%`,
									}}
								></div>
							</div>
						)}
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">
							Expires At
						</h3>
						<p className="text-lg">
							{inviteCode.expires_at
								? format(new Date(inviteCode.expires_at), "PPP p")
								: "Never"}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">
							Auto Join Channel
						</h3>
						<p className="text-lg">
							{inviteCode.auto_join_channel_id ? (
								<span className="font-mono bg-gray-50 px-3 py-1 rounded border">
									{inviteCode.auto_join_channel_id}
								</span>
							) : (
								<span className="text-gray-500">None</span>
							)}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">
							Created By
						</h3>
						<p className="text-lg font-mono">{inviteCode.created_by}</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">
							Created At
						</h3>
						<p className="text-lg">
							{format(new Date(inviteCode.created_at), "PPP p")}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-gray-500 mb-2">
							Updated At
						</h3>
						<p className="text-lg">
							{format(new Date(inviteCode.updated_at), "PPP p")}
						</p>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center">
								<p className="text-2xl font-bold text-blue-600">
									{inviteCode.used_count}
								</p>
								<p className="text-sm text-gray-500">Times Used</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-green-600">
									{inviteCode.max_uses === 0
										? "∞"
										: Math.max(0, inviteCode.max_uses - inviteCode.used_count)}
								</p>
								<p className="text-sm text-gray-500">Remaining Uses</p>
							</div>
							<div className="text-center">
								<p className="text-2xl font-bold text-purple-600">
									{inviteCode.max_uses === 0
										? "N/A"
										: Math.round(
												(inviteCode.used_count / inviteCode.max_uses) * 100,
											)}
									%
								</p>
								<p className="text-sm text-gray-500">Usage Rate</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
