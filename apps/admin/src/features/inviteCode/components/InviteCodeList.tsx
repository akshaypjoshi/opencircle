import type { InviteCode } from "@opencircle/core";
import { Button } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Ban, Edit, Trash2 } from "lucide-react";

interface InviteCodeListProps {
	inviteCodes: InviteCode[];
	onDelete?: (id: string) => void;
	onDeactivate?: (id: string) => void;
	loading?: boolean;
}

export const InviteCodeList = ({
	inviteCodes,
	onDelete,
	onDeactivate,
	loading,
}: InviteCodeListProps) => {
	const columns: ColumnDef<InviteCode>[] = [
		{
			accessorKey: "code",
			header: "Code",
			cell: ({ row }) => (
				<div className="font-mono text-sm font-medium max-w-xs truncate">
					{row.getValue("code")}
				</div>
			),
		},
		{
			accessorKey: "max_uses",
			header: "Max Uses",
			cell: ({ row }) => {
				const maxUses = row.getValue("max_uses") as number;
				return maxUses === 0 ? "Unlimited" : maxUses.toString();
			},
		},
		{
			accessorKey: "used_count",
			header: "Used",
			cell: ({ row }) => {
				const usedCount = row.getValue("used_count") as number;
				const maxUses = row.original.max_uses;
				const remaining =
					maxUses === 0 ? "∞" : (maxUses - usedCount).toString();
				return (
					<div className="text-center">
						{usedCount} / {remaining}
					</div>
				);
			},
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const status = row.getValue("status") as string;
				const statusColors = {
					active: "text-green-600",
					used: "text-red-600",
					expired: "text-gray-600",
				};
				return (
					<div
						className={`capitalize ${statusColors[status as keyof typeof statusColors]}`}
					>
						{status}
					</div>
				);
			},
		},
		{
			accessorKey: "expires_at",
			header: "Expires",
			cell: ({ row }) => {
				const expiresAt = row.getValue("expires_at") as string;
				if (!expiresAt) return "Never";
				const date = new Date(expiresAt);
				return Number.isNaN(date.getTime())
					? "Invalid date"
					: format(date, "MMM dd, yyyy");
			},
		},
		{
			accessorKey: "auto_join_channel_id",
			header: "Auto Join Channel",
			cell: ({ row }) => {
				const channelId = row.getValue("auto_join_channel_id") as string;
				return channelId ? (
					<div className="font-mono text-xs max-w-xs truncate">{channelId}</div>
				) : (
					<div className="text-gray-500">None</div>
				);
			},
		},
		{
			accessorKey: "created_at",
			header: "Created",
			cell: ({ row }) => {
				const dateValue = row.getValue("created_at") as string;
				if (!dateValue) return "N/A";
				const date = new Date(dateValue);
				return Number.isNaN(date.getTime())
					? "Invalid date"
					: format(date, "MMM dd, yyyy");
			},
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const inviteCode = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link
							to="/invite-codes/edit/$id"
							params={{ id: inviteCode.id }}
							className="p-1 hover:bg-gray-100 rounded"
							title="Edit"
						>
							<Edit size={16} />
						</Link>
						{inviteCode.status === "active" && onDeactivate && (
							<button
								type="button"
								onClick={() => onDeactivate(inviteCode.id)}
								className="p-1 hover:bg-yellow-100 rounded text-yellow-600"
								title="Deactivate"
							>
								<Ban size={16} />
							</button>
						)}
						{onDelete && (
							<button
								type="button"
								onClick={() => onDelete(inviteCode.id)}
								className="p-1 hover:bg-red-100 rounded text-red-600"
								title="Delete"
							>
								<Trash2 size={16} />
							</button>
						)}
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: inviteCodes,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-4">
			{loading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border "></div>
				</div>
			) : inviteCodes.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 mb-4">No invite codes found</p>
					<Link to="/invite-codes/new">
						<Button>Create your first invite code</Button>
					</Link>
				</div>
			) : (
				<div className="border border-border rounded-lg overflow-hidden">
					<table className="w-full">
						<thead className="border-b border-border">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className="divide-y divide-border">
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className="px-4 py-4 whitespace-nowrap text-sm"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
