"use client";
import { AdviceCard } from "@/components/AdviceCard";
import { useFinancialAdvice } from "@/hooks/useFinancialAdvice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvicePage() {
	const { advice, loading, fetchAdvice } = useFinancialAdvice();
	const router = useRouter();

	useEffect(() => {
		// Simulate advice fetch on mount
		// Replace with actual transactions from context
		fetchAdvice([]);
	}, []);

	if (loading) return <div>Loading advice...</div>;
	if (!advice) return <div>No advice available yet.</div>;

	return (
		<div>
			<AdviceCard advice={advice} />
			<button
				className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
				onClick={() => router.push("/budget")}>
				Generate Budget
			</button>
		</div>
	);
}
