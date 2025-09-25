"use client";
import { useState } from "react";
import { Advice } from "@/types/advice";

export function useFinancialAdvice() {
	const [advice, setAdvice] = useState<Advice | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchAdvice = async (transactions: any) => {
		setLoading(true);
		// Dummy data
		setAdvice({
			message: "Based on your recent spending, here are some recommendations:",
			recommendations: [
				"Reduce spending on dining out.",
				"Increase savings by 10% next month.",
				"Review recurring subscriptions.",
				"Consider switching to a cheaper utility provider.",
				"Set a monthly budget for entertainment.",
			],
		});
		setLoading(false);
	};

	return { advice, loading, fetchAdvice };
}
