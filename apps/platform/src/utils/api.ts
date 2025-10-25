import { createApi } from "@opencircle/core";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = createApi(API_URL, {
	beforeRequest: [
		(request) => {
			request.headers.set(
				"Authorization",
				`Bearer ${localStorage.getItem("token")}`,
			);
			return request;
		},
	],
});
