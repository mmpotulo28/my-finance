"use client";
import { useState } from "react";
import { Alert } from "@/types/alert";

export function useSuspiciousAlerts() {
	const [alerts, setAlerts] = useState<Alert[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchAlerts = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
		setAlerts([
			{
				id: "1",
				type: "suspicious",
				message: "Unusual withdrawal at ATM",
				date: "2024-06-01",
			},
			{
				id: "2",
				type: "suspicious",
				message: "Large transfer to unknown account",
				date: "2024-06-02",
			},
			{ id: "3", type: "info", message: "Recurring payment detected", date: "2024-06-03" },
			{
				id: "4",
				type: "suspicious",
				message: "Multiple failed login attempts",
				date: "2024-06-04",
			},
			{ id: "5", type: "info", message: "New device login", date: "2024-06-05" },
		]);
		setLoading(false);
	};

	const disputeAlert = (id: string) => {
		setAlerts((prev) =>
			prev.map((alert) => (alert.id === id ? { ...alert, disputed: true } : alert)),
		);
	};

	return { alerts, loading, fetchAlerts, disputeAlert };
}
