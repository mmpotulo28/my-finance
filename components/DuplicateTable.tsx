import { Card } from "@/components/ui/card";
import { DuplicateTransaction } from "@/types/duplicate";

interface DuplicateTableProps {
	duplicates: DuplicateTransaction[];
	onConfirm: (id: string) => void;
}

export function DuplicateTable({ duplicates, onConfirm }: DuplicateTableProps) {
	return (
		<Card>
			<h2>Duplicate Transactions</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Amount</th>
						<th>Confirmed</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{duplicates.map((d) => (
						<tr key={d.id}>
							<td>{d.date}</td>
							<td>{d.description}</td>
							<td>{d.amount}</td>
							<td>{d.confirmed ? "Yes" : "No"}</td>
							<td>
								{!d.confirmed && (
									<button onClick={() => onConfirm(d.id)}>Confirm</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	);
}
