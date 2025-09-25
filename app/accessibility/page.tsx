"use client";
import { VoiceChat } from "@/components/VoiceChat";
import { useVoiceOverChat } from "@/hooks/useVoiceOverChat";

export default function AccessibilityPage() {
	const { messages, loading, sendMessage } = useVoiceOverChat();

	return <VoiceChat messages={messages} onSend={sendMessage} loading={loading} />;
}
