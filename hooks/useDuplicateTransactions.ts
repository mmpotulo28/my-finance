"use client";
import { useState } from "react";
import { DuplicateTransaction } from "@/types/duplicate";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useDuplicateTransactions() {
	const [duplicates, setDuplicates] = useState<DuplicateTransaction[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchDuplicates = async (userId?: string) => {
		setLoading(true);
		try {
			if (userId) {
				const { data, error } = await supabase
					.from("duplicates")
					.select("*")
					.eq("user_id", userId)
					.order("date", { ascending: false });
				if (error) throw error;
				setDuplicates(data || []);
			} else {
				setDuplicates([]);
			}
		} catch (e: any) {
			setDuplicates([]);
		}
		setLoading(false);
	};

	const confirmDuplicate = async (id: string) => {
		setLoading(true);
		try {
			await supabase.from("duplicates").update({ confirmed: true }).eq("id", id);
			setDuplicates((ds) => ds.map((d) => (d.id === id ? { ...d, confirmed: true } : d)));
		} catch (e) {}
		setLoading(false);
	};

	return { duplicates, loading, fetchDuplicates, confirmDuplicate };
}
