"use client";
import { useState } from "react";
import { Budget, BudgetCategory } from "@/types/budget";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useSmartBudget() {
	const [budget, setBudget] = useState<Budget | null>(null);
	const [loading, setLoading] = useState(false);

	const generateBudget = async (transactions: any, userId?: string) => {
		setLoading(true);
		try {
			if (userId) {
				const { data: budgets, error: budgetError } = await supabase
					.from("budgets")
					.select("*")
					.eq("user_id", userId)
					.order("created_at", { ascending: false })
					.limit(1);
				if (budgetError) throw budgetError;
				if (budgets && budgets.length > 0) {
					const budgetId = budgets[0].id;
					const { data: categories, error: catError } = await supabase
						.from("budget_categories")
						.select("*")
						.eq("budget_id", budgetId);
					if (catError) throw catError;
					setBudget({
						id: budgetId,
						categories: categories as BudgetCategory[],
						total: budgets[0].total,
					});
				} else {
					setBudget(null);
				}
			} else {
				setBudget(null);
			}
		} catch (e: any) {
			setBudget(null);
		}
		setLoading(false);
	};

	const updateCategory = async (categoryId: string, allocated: number) => {
		if (!budget) return;
		setLoading(true);
		try {
			await supabase.from("budget_categories").update({ allocated }).eq("id", categoryId);
			setBudget({
				...budget,
				categories: budget.categories.map((cat) =>
					cat.id === categoryId ? { ...cat, allocated } : cat,
				),
			});
		} catch (e) {}
		setLoading(false);
	};

	return { budget, loading, generateBudget, updateCategory };
}
