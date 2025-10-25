import { Button } from "@opencircle/ui";
import { createFileRoute } from "@tanstack/react-router";
import { ChannelTable } from "../../features/channels/components/channelTable";
import { CreateChannelDialog } from "../../features/channels/components/createChannelDialog";
import { useChannels } from "../../features/channels/hooks/useChannels";

export const Route = createFileRoute("/_dashboardLayout/channels")({
	component: RouteComponent,
});

function RouteComponent() {
	const { channels, isChannelsLoading } = useChannels();

	return (
		<main>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-medium">Channels</h1>
				<CreateChannelDialog>
					<Button size="sm">Create Channel</Button>
				</CreateChannelDialog>
			</div>
			<ChannelTable channels={channels} isLoading={isChannelsLoading} />
		</main>
	);
}
