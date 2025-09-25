"use client";
import { useState } from "react";
import { Budget, BudgetCategory } from "@/types/budget";

const categories = [
	{ name: "Groceries", allocated: 400, spent: 350 },
	{ name: "Food & Drink", allocated: 200, spent: 180 },
	{ name: "Transport", allocated: 150, spent: 120 },
	{ name: "Entertainment", allocated: 100, spent: 90 },
	{ name: "Utilities", allocated: 250, spent: 230 },
];

export function useSmartBudget() {
	const [budget, setBudget] = useState<Budget | null>(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState<number>(0);
	const [steps, setSteps] = useState<string[]>([]);

	const generateBudget = async () => {
		setLoading(true);
		setBudget(null);
		setProgress(0);
		setSteps([]);
		let builtCategories: BudgetCategory[] = [];
		let total = 0;

		for (let i = 0; i < categories.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, 700)); // Simulate AI thinking
			const cat = {
				id: `c${i + 1}`,
				name: categories[i].name,
				allocated: categories[i].allocated,
				spent: categories[i].spent,
			};
			builtCategories.push(cat);
			total += cat.allocated;
			setProgress(Math.round(((i + 1) / categories.length) * 100));
			setSteps((prev) => [...prev, `Allocating R${cat.allocated} for ${cat.name}...`]);
		}

		await new Promise((resolve) => setTimeout(resolve, 600)); // Final AI pause

		setBudget({
			id: "b1",
			categories: builtCategories,
			total,
		});
		setLoading(false);
		setSteps((prev) => [...prev, "Budget generation complete!"]);
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

	return { budget, loading, generateBudget, updateCategory, progress, steps };
}
