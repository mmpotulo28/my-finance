"use client";
import { useState } from "react";
import { Budget } from "@/types/budget";

export function useSmartBudget() {
	const [budget, setBudget] = useState<Budget | null>(null);
	const [loading, setLoading] = useState(false);

	const generateBudget = async (transactions: any) => {
		setLoading(true);
		// Dummy data
		setBudget({
			id: "b1",
			categories: [
				{ id: "c1", name: "Groceries", allocated: 400, spent: 350 },
				{ id: "c2", name: "Food & Drink", allocated: 200, spent: 180 },
				{ id: "c3", name: "Transport", allocated: 150, spent: 120 },
				{ id: "c4", name: "Entertainment", allocated: 100, spent: 90 },
				{ id: "c5", name: "Utilities", allocated: 250, spent: 230 },
			],
			total: 1100,
		});
		setLoading(false);
	};

	const updateCategory = (categoryId: string, allocated: number) => {
		if (!budget) return;
		setBudget({
			...budget,
			categories: budget.categories.map((cat) =>
				cat.id === categoryId ? { ...cat, allocated } : cat,
			),
		});
	};

	return { budget, loading, generateBudget, updateCategory };
}
