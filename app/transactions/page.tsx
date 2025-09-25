"use client";
import { TransactionTable } from "@/components/TransactionTable";
import { useTransactionAnalysis } from "@/hooks/useTransactionAnalysis";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
	const { transactions, loading, analyze } = useTransactionAnalysis();
	const router = useRouter();

	useEffect(() => {
		// Simulate file analysis on mount
		// Replace with actual file from upload context
		analyze(new File([], "statement.csv"));
	}, []);

	return (
		<div>
			<TransactionTable transactions={transactions} loading={loading} />
			<button
				className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
				onClick={() => router.push("/advice")}
				disabled={loading || transactions.length === 0}>
				Get Advice
			</button>
		</div>
	);
}
