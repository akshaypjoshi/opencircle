import { Button } from "@opencircle/ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { CourseTable } from "../../../features/course/components/courseTable";
import { useCourses } from "../../../features/course/hooks/useCourses";

export const Route = createFileRoute("/_dashboardLayout/courses/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { courses } = useCourses();
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Courses</h1>
				<Link to="/courses/new">
					<Button>
						<Plus size={16} className="mr-2" />
						Create New Course
					</Button>
				</Link>
			</div>
			<CourseTable courses={courses} />
		</div>
	);
}
