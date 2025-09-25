"use client";
import { AlertBanner } from "@/components/AlertBanner";
import { useSuspiciousAlerts } from "@/hooks/useSuspiciousAlerts";
import { useEffect } from "react";

export default function AlertsPage() {
	const { alerts, loading, fetchAlerts, disputeAlert } = useSuspiciousAlerts();

	useEffect(() => {
		fetchAlerts();
	}, []);

	if (loading) return <div>Loading alerts...</div>;
	return <AlertBanner alerts={alerts} disputeAlert={disputeAlert} />;
}
