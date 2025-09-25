"use client";
import { useState } from "react";
import { Transaction } from "@/types/transaction";

export function useBankStatementUpload() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [fileName, setFileName] = useState<string | undefined>();
	const [summary, setSummary] = useState<string | undefined>();
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const upload = async (file: File) => {
		setLoading(true);
		setError(undefined);
		setFileName(file.name);
		setSummary(undefined);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate upload delay

			// Simulate AI transcription with 20 dummy transactions
			const dummyTxs: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
				id: `tx${i + 1}`,
				date: `2024-06-${(i % 30) + 1}`.padStart(10, "0"),
				description: `Transaction ${i + 1}`,
				category: ["Groceries", "Food & Drink", "Transport", "Entertainment", "Utilities"][
					i % 5
				],
				amount: Math.round(Math.random() * 1000 + 50),
			}));

			setTransactions(dummyTxs);

			// Simulate summary
			const highExpense = dummyTxs.reduce(
				(prev, curr) => (curr.amount > prev.amount ? curr : prev),
				dummyTxs[0],
			);
			setSummary(
				`Highest expense: ${highExpense.description} (R ${highExpense.amount}) in ${highExpense.category}.`,
			);
		} catch (e: any) {
			setError("Upload or transcription failed");
		} finally {
			setLoading(false);
		}
	};

	return { upload, loading, error, fileName, summary, transactions };
}
