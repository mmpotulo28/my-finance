import { Card } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";
import { useState, useMemo } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, SearchIcon, FilterIcon } from "lucide-react";

interface TransactionTableProps {
	transactions: Transaction[];
	loading: boolean;
}

const sortOptions = [
	{ value: "date-desc", label: "Date (Newest)" },
	{ value: "date-asc", label: "Date (Oldest)" },
	{ value: "amount-desc", label: "Amount (High-Low)" },
	{ value: "amount-asc", label: "Amount (Low-High)" },
];

export function TransactionTable({ transactions, loading }: TransactionTableProps) {
	const [selected, setSelected] = useState<Transaction | null>(null);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("date-desc");
	const [filter, setFilter] = useState<string>("all");
	const [showFilter, setShowFilter] = useState(false);

	const categories = useMemo(() => {
		const cats = Array.from(new Set(transactions.map((tx) => tx.category)));
		return cats;
	}, [transactions]);

	const filteredTxs = useMemo(() => {
		let txs = [...transactions];
		if (search.trim()) {
			const s = search.trim().toLowerCase();
			txs = txs.filter(
				(tx) =>
					tx.description.toLowerCase().includes(s) ||
					tx.category.toLowerCase().includes(s) ||
					tx.date.includes(s),
			);
		}
		if (filter !== "all") {
			txs = txs.filter((tx) => tx.category === filter);
		}
		switch (sort) {
			case "date-desc":
				txs.sort((a, b) => b.date.localeCompare(a.date));
				break;
			case "date-asc":
				txs.sort((a, b) => a.date.localeCompare(b.date));
				break;
			case "amount-desc":
				txs.sort((a, b) => b.amount - a.amount);
				break;
			case "amount-asc":
				txs.sort((a, b) => a.amount - b.amount);
				break;
		}
		return txs;
	}, [transactions, search, sort, filter]);

	return (
		<Card className="p-4">
			<h2 className="text-lg font-bold mb-4 text-indigo-700 dark:text-white">Transactions</h2>
			<div className="flex flex-col gap-3 mb-4">
				<div className="flex gap-2 items-center">
					<div className="relative flex-1">
						<Input
							placeholder="Search transactions..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
						<SearchIcon className="absolute left-2 top-2.5 text-gray-400" size={18} />
					</div>
					<Button
						variant="outline"
						size="sm"
						className="flex gap-1 items-center"
						onClick={() => setShowFilter((v) => !v)}>
						<FilterIcon size={16} />
						Filter
					</Button>
					<div className="relative">
						<select
							className="bg-white dark:bg-gray-900 border rounded px-2 py-1 text-xs"
							value={sort}
							onChange={(e) => setSort(e.target.value)}>
							{sortOptions.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
						<ChevronDownIcon
							className="absolute right-2 top-2 text-gray-400 pointer-events-none"
							size={16}
						/>
					</div>
				</div>
				{showFilter && (
					<div className="flex gap-2 items-center mt-2">
						<Label htmlFor="category-filter" className="text-xs">
							Category:
						</Label>
						<select
							id="category-filter"
							className="bg-white dark:bg-gray-900 border rounded px-2 py-1 text-xs"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}>
							<option value="all">All</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			{loading ? (
				<div className="text-center text-indigo-600">Loading...</div>
			) : filteredTxs.length === 0 ? (
				<div className="text-center text-gray-400 py-8">No transactions found.</div>
			) : (
				<div className="flex flex-col gap-3">
					{filteredTxs.map((tx) => (
						<div
							key={tx.id}
							className="bg-indigo-50 dark:bg-gray-900 rounded-lg shadow px-4 py-3 flex flex-col gap-1 cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-800 transition"
							onClick={() => setSelected(tx)}>
							<div className="flex justify-between items-center">
								<span className="font-semibold text-indigo-700 dark:text-white">
									{tx.description}
								</span>
								<span className="text-sm text-gray-500 dark:text-gray-300">
									{tx.date}
								</span>
							</div>
							<div className="flex justify-between items-center mt-1">
								<span className="text-xs text-gray-500 dark:text-gray-400">
									{tx.category}
								</span>
								<span className="font-bold text-green-600 dark:text-green-400">
									R {tx.amount}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
			<Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
				{selected && (
					<DialogContent className="sm:max-w-[350px]">
						<DialogHeader>
							<DialogTitle>Transaction Details</DialogTitle>
							<DialogDescription>
								View the full details of your transaction.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-3 py-2">
							<div>
								<span className="font-semibold">Description:</span>{" "}
								{selected.description}
							</div>
							<div>
								<span className="font-semibold">Date:</span> {selected.date}
							</div>
							<div>
								<span className="font-semibold">Category:</span> {selected.category}
							</div>
							<div>
								<span className="font-semibold">Amount:</span>{" "}
								<span className="font-bold text-green-600 dark:text-green-400">
									R {selected.amount}
								</span>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" className="w-full">
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</Card>
	);
}
