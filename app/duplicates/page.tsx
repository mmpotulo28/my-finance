"use client";
import { DuplicateTable } from "@/components/DuplicateTable";
import { useDuplicateTransactions } from "@/hooks/useDuplicateTransactions";
import { useEffect } from "react";

export default function DuplicatesPage() {
	const { duplicates, loading, fetchDuplicates, confirmDuplicate } = useDuplicateTransactions();

	useEffect(() => {
		fetchDuplicates();
	}, []);

	if (loading) return <div>Loading duplicates...</div>;
	return <DuplicateTable duplicates={duplicates} onConfirm={confirmDuplicate} />;
}
