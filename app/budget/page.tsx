"use client";
import { BudgetEditor } from "@/components/BudgetEditor";
import { useSmartBudget } from "@/hooks/useSmartBudget";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BudgetPage() {
	const { budget, loading, generateBudget, updateCategory, progress, steps } = useSmartBudget();
	const router = useRouter();

	useEffect(() => {
		generateBudget();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-2 py-4 gap-6">
			{loading && (
				<div className="w-full max-w-md flex flex-col items-center gap-4 py-8">
					<div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
						<div
							className="bg-indigo-500 h-4 rounded-full transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<div className="text-indigo-700 dark:text-indigo-300 font-semibold text-lg">
						Generating your smart budget...
					</div>
					<ul className="w-full text-sm text-gray-600 dark:text-gray-300 mt-2 flex flex-col gap-1">
						{steps.map((step, idx) => (
							<li key={idx} className="animate-pulse">
								{step}
							</li>
						))}
					</ul>
				</div>
			)}
			{!loading && budget ? <BudgetEditor budget={budget} onUpdate={updateCategory} /> : null}
			{!loading && !budget && (
				<div className="text-center py-8 text-gray-400">No budget generated yet.</div>
			)}
		</div>
	);
}
