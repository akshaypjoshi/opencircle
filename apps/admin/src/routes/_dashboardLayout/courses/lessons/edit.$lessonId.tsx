import type { LessonCreate, LessonUpdate } from "@opencircle/core";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LessonEditor } from "../../../../features/lesson/components/lessonEditor";
import { useLesson } from "../../../../features/lesson/hooks/useLesson";
import { api } from "../../../../utils/api";

export const Route = createFileRoute(
	"/_dashboardLayout/courses/lessons/edit/$lessonId",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { lessonId } = Route.useParams();
	const router = useRouter();
	const { lesson, isLessonLoading } = useLesson(lessonId);

	const updateLessonMutation = useMutation({
		mutationFn: async ({ id, data }: { id: string; data: LessonUpdate }) => {
			return await api.courses.updateLesson(id, data);
		},
		onSuccess: () => {
			// Redirect back to the course or section
			router.navigate({ to: "/courses" });
		},
	});

	const handleSave = async (data: LessonCreate | LessonUpdate) => {
		try {
			await updateLessonMutation.mutateAsync({
				id: lessonId,
				data: data as LessonUpdate,
			});
		} catch (error) {
			console.error("Failed to update lesson:", error);
		}
	};

	const handleCancel = () => {
		router.navigate({ to: "/courses" });
	};

	if (isLessonLoading || !lesson) {
		return <div>Loading...</div>;
	}

	return (
		<LessonEditor
			lesson={lesson}
			onSave={handleSave}
			onCancel={handleCancel}
			loading={updateLessonMutation.isPending}
			isEdit={true}
		/>
	);
}
