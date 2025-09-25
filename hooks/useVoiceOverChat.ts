"use client";
import { useState } from "react";
import { VoiceMessage } from "@/types/accessibility";

export function useVoiceOverChat() {
	const [messages, setMessages] = useState<VoiceMessage[]>([
		{ id: "m1", sender: "ai", text: "Welcome to your finance adviser!", audioUrl: "" },
		{ id: "m2", sender: "user", text: "How much did I spend last month?", audioUrl: "" },
		{ id: "m3", sender: "ai", text: "You spent $2,300 last month.", audioUrl: "" },
		{ id: "m4", sender: "user", text: "Any suspicious transactions?", audioUrl: "" },
		{
			id: "m5",
			sender: "ai",
			text: "One suspicious transaction detected on June 2.",
			audioUrl: "",
		},
	]);
	const [loading, setLoading] = useState(false);

	const sendMessage = async (text: string) => {
		setLoading(true);
		// Dummy response
		setMessages((msgs) => [
			...msgs,
			{ id: `m${msgs.length + 1}`, sender: "user", text, audioUrl: "" },
			{
				id: `m${msgs.length + 2}`,
				sender: "ai",
				text: "This is a dummy AI response.",
				audioUrl: "",
			},
		]);
		setLoading(false);
	};

	return { messages, loading, sendMessage };
}
