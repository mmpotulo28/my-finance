import { Alert as AlertType } from "@/types/alert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface AlertBannerProps {
	alerts: AlertType[];
	disputeAlert?: (id: string) => void;
}

export function AlertBanner({ alerts, disputeAlert }: AlertBannerProps) {
	return (
		<div className="grid w-full max-w-xl items-start gap-4 mx-auto">
			<h2 className="text-xl font-bold mb-2 text-indigo-700 dark:text-white">Alerts</h2>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.type === "suspicious" ? "destructive" : "default"}
					className="flex items-start gap-3">
					{alert.type === "suspicious" ? (
						<AlertCircleIcon className="text-red-500 mt-1" />
					) : (
						<CheckCircle2Icon className="text-green-500 mt-1" />
					)}
					<div>
						<AlertTitle className="flex items-center gap-2">
							{alert.type === "suspicious" ? "Suspicious Activity" : "Info"}
							<span className="text-xs text-gray-400 ml-2">{alert.date}</span>
						</AlertTitle>
						<AlertDescription>
							{alert.message}
							{alert.type === "suspicious" && !alert.disputed && disputeAlert && (
								<div className="mt-2">
									<button
										className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs hover:bg-yellow-200 transition"
										onClick={() => disputeAlert(alert.id)}>
										Dispute as False Positive
									</button>
								</div>
							)}
							{alert.disputed && (
								<div className="mt-2 text-xs text-yellow-700 font-semibold">
									Disputed as False Positive
								</div>
							)}
						</AlertDescription>
					</div>
				</Alert>
			))}
		</div>
	);
}
