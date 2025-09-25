import { Card } from "@/components/ui/card";
import { Budget } from "@/types/budget";

interface BudgetEditorProps {
	budget: Budget;
	onUpdate: (categoryId: string, allocated: number) => void;
}

export function BudgetEditor({ budget, onUpdate }: BudgetEditorProps) {
	return (
		<Card>
			<h2>Smart Budget</h2>
			<table>
				<thead>
					<tr>
						<th>Category</th>
						<th>Allocated</th>
						<th>Spent</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{budget.categories.map((cat) => (
						<tr key={cat.id}>
							<td>{cat.name}</td>
							<td>{cat.allocated}</td>
							<td>{cat.spent}</td>
							<td>
								<input
									type="number"
									value={cat.allocated}
									onChange={(e) => onUpdate(cat.id, Number(e.target.value))}
									min={0}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>Total: {budget.total}</div>
		</Card>
	);
}
