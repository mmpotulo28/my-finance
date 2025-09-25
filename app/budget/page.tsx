"use client";
import { BudgetEditor } from "@/components/BudgetEditor";
import { useSmartBudget } from "@/hooks/useSmartBudget";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BudgetPage() {
	const { budget, loading, generateBudget, updateCategory } = useSmartBudget();
	const router = useRouter();

	useEffect(() => {
		// Simulate budget generation on mount
		// Replace with actual transactions from context
		generateBudget([]);
	}, []);

	if (loading) return <div>Loading budget...</div>;
	if (!budget) return <div>No budget generated yet.</div>;

	return (
		<div>
			<BudgetEditor budget={budget} onUpdate={updateCategory} />
			<div className="flex gap-2 mt-4">
				<button
					className="px-3 py-2 bg-indigo-500 text-white rounded"
					onClick={() => router.push("/alerts")}>
					Alerts
				</button>
				<button
					className="px-3 py-2 bg-indigo-500 text-white rounded"
					onClick={() => router.push("/duplicates")}>
					Duplicates
				</button>
				<button
					className="px-3 py-2 bg-indigo-500 text-white rounded"
					onClick={() => router.push("/investments")}>
					Investments
				</button>
				<button
					className="px-3 py-2 bg-indigo-500 text-white rounded"
					onClick={() => router.push("/accessibility")}>
					Accessibility
				</button>
			</div>
		</div>
	);
}
