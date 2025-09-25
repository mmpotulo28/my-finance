import { Card } from "@/components/ui/card";
import { Advice } from "@/types/advice";
import {
	LightbulbIcon,
	CheckCircle2Icon,
	InfoIcon,
	ThumbsUpIcon,
	ThumbsDownIcon,
	RefreshCwIcon,
	SendIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdviceCardProps {
	advice: Advice;
	onRegenerate?: () => void;
}

export function AdviceCard({ advice, onRegenerate }: AdviceCardProps) {
	const [explainedIdx, setExplainedIdx] = useState<number | null>(null);
	const [likes, setLikes] = useState<(boolean | null)[]>(advice.recommendations.map(() => null));
	const [feedback, setFeedback] = useState("");
	const [feedbackSent, setFeedbackSent] = useState(false);

	const handleExplain = (idx: number) => {
		setExplainedIdx(idx === explainedIdx ? null : idx);
	};

	const handleLike = (idx: number, val: boolean) => {
		setLikes((prev) => prev.map((v, i) => (i === idx ? val : v)));
	};

	const handleFeedback = () => {
		setFeedbackSent(true);
		setTimeout(() => setFeedbackSent(false), 2000);
		setFeedback("");
	};

	return (
		<Card className="max-w-md mx-auto p-6 flex flex-col gap-4 shadow-lg">
			<div className="flex items-center gap-2 mb-2">
				<LightbulbIcon size={28} className="text-yellow-400" />
				<h2 className="text-xl font-bold text-indigo-700 dark:text-white">
					Personalized Advice
				</h2>
			</div>
			<p className="text-gray-700 dark:text-gray-200 mb-2">{advice.message}</p>
			<ul className="flex flex-col gap-2">
				{advice.recommendations.map((rec, idx) => (
					<li
						key={idx}
						className="flex flex-col gap-1 bg-indigo-50 dark:bg-gray-900 rounded px-3 py-2">
						<div className="flex items-center gap-2">
							<CheckCircle2Icon size={18} className="text-green-500" />
							<span className="text-sm text-gray-800 dark:text-gray-100">{rec}</span>
							<Button
								variant="ghost"
								size="icon"
								className="ml-auto"
								onClick={() => handleExplain(idx)}
								aria-label="Explain">
								<InfoIcon size={16} className="text-indigo-500" />
							</Button>
						</div>
						{explainedIdx === idx && (
							<div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
								This advice is generated based on your recent spending patterns and
								aims to help you optimize your finances. (Demo explanation)
							</div>
						)}
						<div className="flex gap-2 mt-2 items-center">
							<Button
								variant={likes[idx] === true ? "default" : "outline"}
								size="sm"
								onClick={() => handleLike(idx, true)}
								aria-label="Like">
								<ThumbsUpIcon size={16} className="mr-1" />
								Like
							</Button>
							<Button
								variant={likes[idx] === false ? "default" : "outline"}
								size="sm"
								onClick={() => handleLike(idx, false)}
								aria-label="Dislike">
								<ThumbsDownIcon size={16} className="mr-1" />
								Dislike
							</Button>
							{likes[idx] !== null && (
								<span
									className={`text-xs font-semibold ${
										likes[idx] ? "text-green-600" : "text-red-600"
									}`}>
									{likes[idx] ? "Liked" : "Disliked"}
								</span>
							)}
						</div>
					</li>
				))}
			</ul>
			<div className="flex gap-2 mt-2 items-center">
				<Button
					variant="outline"
					size="sm"
					onClick={onRegenerate}
					aria-label="Regenerate Advice">
					<RefreshCwIcon size={16} className="mr-1" />
					Regenerate
				</Button>
			</div>
			<div className="mt-4">
				<label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">
					Provide feedback on this advice:
				</label>
				<div className="flex gap-2">
					<Input
						placeholder="Type your feedback..."
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						className="flex-1"
						disabled={feedbackSent}
					/>
					<Button
						variant="default"
						size="icon"
						disabled={!feedback || feedbackSent}
						onClick={handleFeedback}
						aria-label="Send Feedback">
						<SendIcon size={16} />
					</Button>
				</div>
				{feedbackSent && (
					<div className="text-xs text-green-600 mt-1">Feedback sent! Thank you.</div>
				)}
			</div>
		</Card>
	);
}
