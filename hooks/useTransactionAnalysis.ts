"use client";
import { useState } from "react";
import { Transaction } from "@/types/transaction";

const dummyTxs: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
	id: `tx${i + 1}`,
	date: `2024-06-${(i % 30) + 1}`.padStart(10, "0"),
	description: `Transaction ${i + 1}`,
	category: ["Groceries", "Food & Drink", "Transport", "Entertainment", "Utilities"][i % 5],
	amount: Math.round(Math.random() * 1000 + 50),
}));

export function useTransactionAnalysis() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(false);

	const analyze = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
		setTransactions(dummyTxs);
		setLoading(false);
	};

	return { transactions, loading, analyze };
}
