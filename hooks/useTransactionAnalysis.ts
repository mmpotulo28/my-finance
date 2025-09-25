"use client";
import { useState } from "react";
import { Transaction } from "@/types/transaction";

export function useTransactionAnalysis() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(false);

	const analyze = async (file: File) => {
		setLoading(true);
		// Dummy data
		setTransactions([
			{
				id: "t1",
				date: "2024-06-01",
				description: "Coffee Shop",
				category: "Food & Drink",
				amount: 25,
			},
			{
				id: "t2",
				date: "2024-06-02",
				description: "Grocery Store",
				category: "Groceries",
				amount: 120,
			},
			{
				id: "t3",
				date: "2024-06-03",
				description: "Online Subscription",
				category: "Entertainment",
				amount: 15,
			},
			{
				id: "t4",
				date: "2024-06-04",
				description: "Taxi Ride",
				category: "Transport",
				amount: 40,
			},
			{
				id: "t5",
				date: "2024-06-05",
				description: "Restaurant",
				category: "Food & Drink",
				amount: 60,
			},
		]);
		setLoading(false);
	};

	return { transactions, loading, analyze };
}
