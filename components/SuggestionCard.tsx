import { Card } from "@/components/ui/card";
import { InvestmentSuggestion } from "@/types/investment";

interface SuggestionCardProps {
	suggestion: InvestmentSuggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
	return (
		<Card>
			<h2>{suggestion.platform}</h2>
			<p>{suggestion.description}</p>
			<a href={suggestion.link} target="_blank" rel="noopener noreferrer">
				Learn More
			</a>
		</Card>
	);
}
