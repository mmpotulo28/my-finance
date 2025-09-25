"use client";
import { AlertBanner } from "@/components/AlertBanner";
import { useSuspiciousAlerts } from "@/hooks/useSuspiciousAlerts";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, SearchIcon, DownloadIcon, ChevronDownIcon } from "lucide-react";

const sortOptions = [
	{ value: "date-desc", label: "Date (Newest)" },
	{ value: "date-asc", label: "Date (Oldest)" },
	{ value: "type", label: "Type" },
];

export default function AlertsPage() {
	const { alerts, loading, fetchAlerts, disputeAlert } = useSuspiciousAlerts();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"all" | "disputed" | "undisputed">("all");
	const [sort, setSort] = useState("date-desc");
	const [showFilter, setShowFilter] = useState(false);

	useEffect(() => {
		fetchAlerts();
	}, []);

	const filteredAlerts = useMemo(() => {
		let result = [...alerts];
		if (search.trim()) {
			const s = search.trim().toLowerCase();
			result = result.filter(
				(a) =>
					a.message.toLowerCase().includes(s) || a.date.includes(s) || a.type.includes(s),
			);
		}
		if (filter === "disputed") {
			result = result.filter((a) => a.disputed);
		} else if (filter === "undisputed") {
			result = result.filter((a) => !a.disputed);
		}
		switch (sort) {
			case "date-desc":
				result.sort((a, b) => b.date.localeCompare(a.date));
				break;
			case "date-asc":
				result.sort((a, b) => a.date.localeCompare(b.date));
				break;
			case "type":
				result.sort((a, b) => a.type.localeCompare(b.type));
				break;
		}
		return result;
	}, [alerts, search, filter, sort]);

	const handleExport = () => {
		const csv = [
			["Date", "Type", "Message", "Disputed"],
			...filteredAlerts.map((a) => [a.date, a.type, a.message, a.disputed ? "Yes" : "No"]),
		]
			.map((row) => row.map((v) => `"${v}"`).join(","))
			.join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "alerts.csv";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="max-w-xl mx-auto px-2 py-4">
			<h1 className="text-2xl font-bold text-indigo-700 dark:text-white mb-4">Alerts</h1>
			<div className="flex flex-col gap-3 mb-4">
				<div className="flex gap-2 items-center">
					<div className="relative flex-1">
						<Input
							placeholder="Search alerts..."
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
					<Button
						variant="outline"
						size="sm"
						className="flex gap-1 items-center"
						onClick={handleExport}>
						<DownloadIcon size={16} />
						Export
					</Button>
				</div>
				{showFilter && (
					<div className="flex gap-2 items-center mt-2">
						<label htmlFor="alert-filter" className="text-xs">
							Show:
						</label>
						<select
							id="alert-filter"
							className="bg-white dark:bg-gray-900 border rounded px-2 py-1 text-xs"
							value={filter}
							onChange={(e) => setFilter(e.target.value as any)}>
							<option value="all">All</option>
							<option value="undisputed">Undisputed</option>
							<option value="disputed">Disputed</option>
						</select>
					</div>
				)}
			</div>
			{loading ? (
				<div className="text-center text-indigo-600">Loading alerts...</div>
			) : filteredAlerts.length === 0 ? (
				<div className="text-center text-gray-400 py-8">No alerts found.</div>
			) : (
				<AlertBanner alerts={filteredAlerts} disputeAlert={disputeAlert} />
			)}
		</div>
	);
}
