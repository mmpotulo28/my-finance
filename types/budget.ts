export interface BudgetCategory {
	id: string;
	name: string;
	allocated: number;
	spent: number;
}

export interface Budget {
	id: string;
	categories: BudgetCategory[];
	total: number;
}
