"use client";
import { useState } from "react";
import { InvestmentSuggestion } from "@/types/investment";

export function useInvestmentSuggestions() {
	const [suggestions, setSuggestions] = useState<InvestmentSuggestion[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchSuggestions = async (profile: any) => {
		setLoading(true);
		// Dummy data
		setSuggestions([
			{
				id: "i1",
				platform: "Acorns",
				description: "Micro-investing for beginners.",
				link: "https://www.acorns.com",
			},
			{
				id: "i2",
				platform: "Robinhood",
				description: "Commission-free stock trading.",
				link: "https://www.robinhood.com",
			},
			{
				id: "i3",
				platform: "Wealthfront",
				description: "Automated investing and savings.",
				link: "https://www.wealthfront.com",
			},
			{
				id: "i4",
				platform: "Betterment",
				description: "Robo-advisor for smart investing.",
				link: "https://www.betterment.com",
			},
			{
				id: "i5",
				platform: "Vanguard",
				description: "Low-cost index funds.",
				link: "https://www.vanguard.com",
			},
		]);
		setLoading(false);
	};

	return { suggestions, loading, fetchSuggestions };
}
