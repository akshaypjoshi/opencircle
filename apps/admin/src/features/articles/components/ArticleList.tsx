import { Button } from "@opencircle/ui";
import { Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import type { Article } from "../types/article";

interface ArticleListProps {
	articles: Article[];
	onDelete?: (id: string) => void;
	loading?: boolean;
}

export const ArticleList = ({
	articles,
	onDelete,
	loading,
}: ArticleListProps) => {
	const columns: ColumnDef<Article>[] = [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => (
				<div className="font-medium max-w-xs truncate">
					{row.getValue("title")}
				</div>
			),
		},
		{
			accessorKey: "user",
			header: "Author",
			cell: ({ row }) => {
				const user = row.getValue("user") as Article["user"];
				return user?.name || user?.username || "Unknown";
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
			accessorKey: "updated_at",
			header: "Updated",
			cell: ({ row }) => {
				const dateValue = row.getValue("updated_at") as string;
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
				const article = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link
							to="/articles/$id"
							params={{ id: article.id }}
							className="p-1 hover:bg-gray-100 rounded"
							title="View"
						>
							<Eye size={16} />
						</Link>
						<Link
							to="/articles/edit/$id"
							params={{ id: article.id }}
							className="p-1 hover:bg-gray-100 rounded"
							title="Edit"
						>
							<Edit size={16} />
						</Link>
						{onDelete && (
							<button
								type="button"
								onClick={() => onDelete(article.id)}
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
		data: articles,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Articles</h2>
				<Link to="/articles/new">
					<Button>
						<Plus size={16} className="mr-2" />
						New Article
					</Button>
				</Link>
			</div>

			{loading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border "></div>
				</div>
			) : articles.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 mb-4">No articles found</p>
					<Link to="/articles/new">
						<Button>Create your first article</Button>
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
