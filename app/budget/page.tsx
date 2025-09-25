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

	if (loading) return <div className="text-center py-8 text-indigo-600">Loading budget...</div>;
	if (!budget)
		return <div className="text-center py-8 text-gray-400">No budget generated yet.</div>;

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-2 py-4 gap-6">
			<BudgetEditor budget={budget} onUpdate={updateCategory} />
		</div>
	);
}
