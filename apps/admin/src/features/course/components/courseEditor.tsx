import type {
	CourseCreate,
	CourseStatus,
	CourseUpdate,
} from "@opencircle/core";
import { Button, Input } from "@opencircle/ui";
import { Save } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { useState } from "react";
import { CourseContentManager } from "./courseContentManager";

interface CourseEditorProps {
	course?: Partial<CourseCreate> & { id?: string };
	onSave: (data: CourseCreate | CourseUpdate) => Promise<void>;
	onCancel?: () => void;
	loading?: boolean;
	isEdit?: boolean;
}

export const CourseEditor = ({
	course,
	onSave,
	onCancel,
	loading,
	isEdit = false,
}: CourseEditorProps) => {
	const [title, setTitle] = useState(course?.title || "");
	const [description, setDescription] = useState(course?.description || "");
	const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail_url || "");
	const [status, setStatus] = useState<CourseStatus>(course?.status || "draft");
	const [price, setPrice] = useState(course?.price?.toString() || "");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			return;
		}

		if (isEdit && course?.id) {
			const updateData: CourseUpdate = {
				title: title.trim(),
				description: description.trim() || undefined,
				thumbnail_url: thumbnailUrl.trim() || undefined,
				status,
				price: price ? parseFloat(price) : undefined,
			};
			onSave(updateData);
		} else {
			const createData: CourseCreate = {
				title: title.trim(),
				description: description.trim() || undefined,
				thumbnail_url: thumbnailUrl.trim() || undefined,
				status,
				instructor_id: "", // Will be set in the route component
				price: price ? parseFloat(price) : undefined,
			};
			onSave(createData);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">
						{isEdit ? "Edit Course" : "Create New Course"}
					</h1>
					<div className="flex gap-2">
						{onCancel && (
							<Button type="button" onClick={onCancel}>
								Cancel
							</Button>
						)}
						<Button type="submit" disabled={loading || !title.trim()}>
							<Save size={16} className="mr-2" />
							{loading ? "Saving..." : "Save"}
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<div>
							<label htmlFor="title" className="block text-sm font-medium mb-2">
								Title *
							</label>
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter course title..."
								required
							/>
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium mb-2"
							>
								Description
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter course description..."
								rows={4}
								className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
							/>
						</div>

						<div>
							<label
								htmlFor="thumbnailUrl"
								className="block text-sm font-medium mb-2"
							>
								Thumbnail URL
							</label>
							<Input
								value={thumbnailUrl}
								onChange={(e) => setThumbnailUrl(e.target.value)}
								placeholder="Enter thumbnail URL..."
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="status"
									className="block text-sm font-medium mb-2"
								>
									Status
								</label>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild>
										<button
											type="button"
											className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-left flex items-center justify-between"
										>
											<span className="capitalize">{status}</span>
											<svg
												width="12"
												height="12"
												viewBox="0 0 12 12"
												fill="none"
											>
												<title>test</title>
												<path
													d="M3 4.5L6 7.5L9 4.5"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content
										sideOffset={5}
										align="start"
										className="rounded-lg overflow-hidden bg-background border border-border min-w-[200px] shadow-lg z-50"
									>
										<DropdownMenu.Item
											className="px-3 py-2 text-sm hover:bg-muted focus-within:outline-none cursor-pointer capitalize"
											onClick={() => setStatus("draft")}
										>
											Draft
										</DropdownMenu.Item>
										<DropdownMenu.Item
											className="px-3 py-2 text-sm hover:bg-muted focus-within:outline-none cursor-pointer capitalize"
											onClick={() => setStatus("published")}
										>
											Published
										</DropdownMenu.Item>
										<DropdownMenu.Item
											className="px-3 py-2 text-sm hover:bg-muted focus-within:outline-none cursor-pointer capitalize"
											onClick={() => setStatus("archived")}
										>
											Archived
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</div>

							<div>
								<label
									htmlFor="price"
									className="block text-sm font-medium mb-2"
								>
									Price ($)
								</label>
								<Input
									type="number"
									step="0.01"
									min="0"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									placeholder="0.00"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="bg-muted/50 rounded-lg p-6">
							<h3 className="font-medium mb-4">Course Preview</h3>
							<div className="space-y-3">
								{thumbnailUrl && (
									<img
										src={thumbnailUrl}
										alt="Course thumbnail"
										className="w-full h-32 object-cover rounded-md"
										onError={(e) => {
											e.currentTarget.style.display = "none";
										}}
									/>
								)}
								<h4 className="font-semibold text-lg">
									{title || "Course Title"}
								</h4>
								{description && (
									<p className="text-sm text-muted-foreground line-clamp-3">
										{description}
									</p>
								)}
								<div className="flex items-center justify-between pt-2">
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
											status === "published"
												? "bg-green-100 text-green-800"
												: status === "draft"
													? "bg-yellow-100 text-yellow-800"
													: "bg-gray-100 text-gray-800"
										}`}
									>
										{status}
									</span>
									<span className="font-medium">
										{price ? `$${price}` : "Free"}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
			{course?.id && (
				<div className="border-t pt-6 mt-6">
					<CourseContentManager courseId={course.id} />
				</div>
			)}
		</>
	);
};
