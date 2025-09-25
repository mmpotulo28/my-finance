"use client";
import { useState } from "react";
import { DuplicateTransaction } from "@/types/duplicate";

export function useDuplicateTransactions() {
	const [duplicates, setDuplicates] = useState<DuplicateTransaction[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchDuplicates = async () => {
		setLoading(true);
		// Dummy data
		setDuplicates([
			{
				id: "d1",
				originalId: "t1",
				date: "2024-06-01",
				description: "Coffee Shop",
				amount: 25,
				confirmed: false,
			},
			{
				id: "d2",
				originalId: "t2",
				date: "2024-06-02",
				description: "Grocery Store",
				amount: 120,
				confirmed: false,
			},
			{
				id: "d3",
				originalId: "t3",
				date: "2024-06-03",
				description: "Online Subscription",
				amount: 15,
				confirmed: false,
			},
			{
				id: "d4",
				originalId: "t4",
				date: "2024-06-04",
				description: "Taxi Ride",
				amount: 40,
				confirmed: false,
			},
			{
				id: "d5",
				originalId: "t5",
				date: "2024-06-05",
				description: "Restaurant",
				amount: 60,
				confirmed: false,
			},
		]);
		setLoading(false);
	};

	const confirmDuplicate = (id: string) => {
		setDuplicates((ds) => ds.map((d) => (d.id === id ? { ...d, confirmed: true } : d)));
	};

	return { duplicates, loading, fetchDuplicates, confirmDuplicate };
}
