import { Card } from "@/components/ui/card";
import { Advice } from "@/types/advice";

interface AdviceCardProps {
	advice: Advice;
}

export function AdviceCard({ advice }: AdviceCardProps) {
	return (
		<Card>
			<h2>Personalized Advice</h2>
			<p>{advice.message}</p>
			<ul>
				{advice.recommendations.map((rec, idx) => (
					<li key={idx}>{rec}</li>
				))}
			</ul>
		</Card>
	);
}
