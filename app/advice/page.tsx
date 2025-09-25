"use client";
import { AdviceCard } from "@/components/AdviceCard";
import { useFinancialAdvice } from "@/hooks/useFinancialAdvice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvicePage() {
	const { advice, loading, fetchAdvice } = useFinancialAdvice();
	const router = useRouter();

	useEffect(() => {
		fetchAdvice();
	}, []);

	const handleRegenerate = () => {
		fetchAdvice();
	};

	if (loading) return <div className="text-center py-8 text-indigo-600">Loading advice...</div>;
	if (!advice)
		return <div className="text-center py-8 text-gray-400">No advice available yet.</div>;

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-2 py-4 gap-6">
			<AdviceCard advice={advice} onRegenerate={handleRegenerate} />
			<button
				className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
				onClick={() => router.push("/budget")}>
				Generate Budget
			</button>
		</div>
	);
}
