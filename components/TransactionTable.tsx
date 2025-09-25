import { Card } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";

interface TransactionTableProps {
	transactions: Transaction[];
	loading: boolean;
}

export function TransactionTable({ transactions, loading }: TransactionTableProps) {
	return (
		<Card>
			<h2>Transactions</h2>
			{loading ? (
				<div>Loading...</div>
			) : (
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Category</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((tx) => (
							<tr key={tx.id}>
								<td>{tx.date}</td>
								<td>{tx.description}</td>
								<td>{tx.category}</td>
								<td>{tx.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</Card>
	);
}
