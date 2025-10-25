import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../../components/header";
import { CourseList } from "../../../features/courses/components/courseList";

export const Route = createFileRoute("/_socialLayout/courses/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Header label="Courses" />
			<CourseList />
		</>
	);
}
