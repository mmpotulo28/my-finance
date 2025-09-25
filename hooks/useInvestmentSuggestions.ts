/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { InvestmentSuggestion } from "@/types/investment";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export function useInvestmentSuggestions() {
	const [suggestions, setSuggestions] = useState<InvestmentSuggestion[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchSuggestions = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase.from("investment_suggestions").select("*");
			if (error) throw error;
			setSuggestions(data || []);
		} catch (e: any) {
			setSuggestions([]);
		}
		setLoading(false);
	};

	return { suggestions, loading, fetchSuggestions };
}
