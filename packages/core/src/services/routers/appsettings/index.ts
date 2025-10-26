import { BaseRouter } from "../../baseRouter";
import type {
	AppSettings,
	AppSettingsCreate,
	AppSettingsUpdate,
} from "../../types";

export class AppSettingsRouter extends BaseRouter {
	async getSettings(): Promise<AppSettings> {
		return this.client.get<AppSettings>("appsettings/");
	}

	async createSettings(data: AppSettingsCreate): Promise<AppSettings> {
		return this.client.post<AppSettings>("appsettings/", data);
	}

	async updateSettings(data: AppSettingsUpdate): Promise<AppSettings> {
		return this.client.put<AppSettings>("appsettings/", data);
	}

	async getSettingsCount(): Promise<number> {
		return this.client.get<number>("appsettings/count");
	}
}
