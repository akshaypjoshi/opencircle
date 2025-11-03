import { Link } from "@tanstack/react-router";
import { Bell, Github, List, Paperclip, Video, Zap } from "lucide-react";
import { useAppSettings } from "../features/appSettings/hooks/useAppSettings";
import { ChannelList } from "../features/channels/components/ChannelList";
import { NotificationNumbers } from "../features/notifications/components/notificatioNumbers";
import { MenuItem } from "./menuItem";

export const LeftSidebar = () => {
	const { appSettings } = useAppSettings();

	return (
		<div className="sticky top-0 h-screen flex justify-between flex-col py-4 pr-4">
			<div className="space-y-4">
				<Link to="/" className="block">
					{appSettings?.app_logo_url ? (
						<img
							src={appSettings.app_logo_url}
							alt={appSettings.app_name}
							className="w-[60%] ml-2"
						/>
					) : (
						<section className="relative flex gap-2 items-center ml-2">
							<div className="w-6 h-6 bg-foreground text-background rounded-lg flex justify-center items-center">
								<Zap size={12} fill="currentColor" />
							</div>
							<h2 className="font-medium">Opencircle</h2>
							<div className="-ml-1 tracking-tight bg-foreground text-background rounded-lg px-1 py-0.5 text-[10px] font-medium">
								alpha
							</div>
						</section>
					)}
				</Link>
				<section className="font-medium">
					<MenuItem icon={<List size={16} />} label="Timeline" to="/" />
					<MenuItem
						icon={<Paperclip size={16} />}
						label="Articles"
						to="/articles"
					/>
					<MenuItem icon={<Video size={16} />} label="Courses" to="/courses" />
					<Link
						to="/notifications"
						className="flex text-sm items-center cursor-pointer hover:bg-primary rounded-lg p-2 transition duration-150"
					>
						<Bell size={16} />
						<span className="ml-3">Notifications</span>
						<NotificationNumbers />
					</Link>
				</section>
				<section className="p-2 space-y-3">
					<div className="text-sm space-y-2">
						<div>Channels</div>
						<div className="w-8 h-0.5 bg-foreground/20" />
					</div>
					<ChannelList />
				</section>
			</div>
			<div>
				<section className="flex flex-wrap px-4 py-2 space-y-2 space-x-4 text-xs font-semibold">
					<a
						href="https://devscale.id"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-primary transition duration-150"
					>
						devscale.id
					</a>
					<a
						href="https://devscale.id/programs"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-primary transition duration-150"
					>
						programs
					</a>
					<span className="text-foreground/50">help</span>
					<span className="text-foreground/50">contact</span>
				</section>
				<div className="space-y-5 bg-linear-210 rounded-lg border border-border tracking-tight p-4 text-sm font-medium from-background-secondary to-transparent">
					<div>
						Opensource Community Platform for Creators built by Devscalelabs.
					</div>
					<a
						href="https://github.com/devscalelabs/opencircle"
						target="_blank"
						rel="noopener noreferrer"
						className="flex gap-1 items-center bg-white w-fit text-black font-medium px-2 py-1 rounded-lg"
					>
						<Github size={14} />
						Opencircle
					</a>
				</div>
			</div>
		</div>
	);
};
