"use client";
import { SuggestionCard } from "@/components/SuggestionCard";
import { useInvestmentSuggestions } from "@/hooks/useInvestmentSuggestions";
import { useEffect } from "react";

export default function InvestmentsPage() {
	const { suggestions, loading, fetchSuggestions } = useInvestmentSuggestions();

	useEffect(() => {
		// Simulate profile for suggestions
		fetchSuggestions();
	}, []);

	if (loading) return <div>Loading investment suggestions...</div>;
	return (
		<div>
			{suggestions.map((suggestion) => (
				<SuggestionCard key={suggestion.id} suggestion={suggestion} />
			))}
		</div>
	);
}
