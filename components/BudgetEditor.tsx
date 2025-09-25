import { Card } from "@/components/ui/card";
import { Budget } from "@/types/budget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PencilIcon, CheckIcon } from "lucide-react";

interface BudgetEditorProps {
	budget: Budget;
	onUpdate: (categoryId: string, allocated: number) => void;
}

export function BudgetEditor({ budget, onUpdate }: BudgetEditorProps) {
	const [editId, setEditId] = useState<string | null>(null);
	const [editValue, setEditValue] = useState<number | null>(null);

	const handleEdit = (catId: string, allocated: number) => {
		setEditId(catId);
		setEditValue(allocated);
	};

	const handleSave = (catId: string) => {
		if (editValue !== null) {
			onUpdate(catId, editValue);
		}
		setEditId(null);
		setEditValue(null);
	};

	const totalSpent = budget.categories.reduce((sum, cat) => sum + cat.spent, 0);
	const totalAllocated = budget.categories.reduce((sum, cat) => sum + cat.allocated, 0);

	return (
		<Card className="max-w-md mx-auto p-4 flex flex-col gap-4 shadow-lg w-full">
			<h2 className="text-xl font-bold text-indigo-700 dark:text-white mb-2">Smart Budget</h2>
			<div className="flex flex-col gap-2 mb-4">
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500 dark:text-gray-300">
						Total Allocated
					</span>
					<span className="font-bold text-indigo-700 dark:text-indigo-300">
						R {totalAllocated}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500 dark:text-gray-300">Total Spent</span>
					<span className="font-bold text-green-600 dark:text-green-400">
						R {totalSpent}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500 dark:text-gray-300">Remaining</span>
					<span className="font-bold text-orange-600 dark:text-orange-400">
						R {totalAllocated - totalSpent}
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{budget.categories.map((cat) => {
					const percent = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
					const overBudget = cat.spent > cat.allocated;
					return (
						<Card
							key={cat.id}
							className="p-3 flex flex-col gap-2 bg-indigo-50 dark:bg-gray-900 shadow">
							<div className="flex justify-between items-center">
								<span className="font-semibold text-indigo-700 dark:text-white">
									{cat.name}
								</span>
								{editId === cat.id ? (
									<div className="flex gap-2 items-center">
										<Input
											type="number"
											value={editValue ?? cat.allocated}
											onChange={(e) => setEditValue(Number(e.target.value))}
											min={0}
											className="w-20 text-right"
										/>
										<Button
											size="sm"
											variant="outline"
											className="px-2"
											onClick={() => handleSave(cat.id)}>
											<CheckIcon size={16} />
										</Button>
									</div>
								) : (
									<div className="flex gap-2 items-center">
										<span className="text-xs text-gray-500 dark:text-gray-400">
											Allocated:
										</span>
										<span className="font-bold text-indigo-700 dark:text-indigo-300">
											R {cat.allocated}
										</span>
										<Button
											size="sm"
											variant="ghost"
											className="px-2"
											onClick={() => handleEdit(cat.id, cat.allocated)}>
											<PencilIcon size={16} />
										</Button>
									</div>
								)}
							</div>
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-500 dark:text-gray-400">
									Spent:
								</span>
								<span
									className={`font-bold ${
										overBudget
											? "text-red-600 dark:text-red-400"
											: "text-green-600 dark:text-green-400"
									}`}>
									R {cat.spent}
								</span>
							</div>
							<div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded mt-1">
								<div
									className={`h-2 rounded transition-all ${
										overBudget ? "bg-red-500" : "bg-indigo-500"
									}`}
									style={{ width: `${percent}%` }}
								/>
							</div>
							<div className="flex justify-between items-center text-xs mt-1">
								<span>{percent}% used</span>
								{overBudget && (
									<span className="text-red-600 font-semibold">Over budget!</span>
								)}
							</div>
						</Card>
					);
				})}
			</div>
		</Card>
	);
}
