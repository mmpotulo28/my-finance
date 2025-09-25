import { VoiceMessage } from "@/types/accessibility";
import { useState } from "react";

interface VoiceChatProps {
	messages: VoiceMessage[];
	onSend: (text: string) => void;
	loading: boolean;
}

export function VoiceChat({ messages, onSend, loading }: VoiceChatProps) {
	const [input, setInput] = useState("");

	return (
		<div>
			<h2>Voice-Over Chat</h2>
			<ul>
				{messages.map((msg) => (
					<li key={msg.id}>
						<strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
						{msg.audioUrl && <audio src={msg.audioUrl} controls />}
					</li>
				))}
			</ul>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				disabled={loading}
				placeholder="Type your message or use voice..."
			/>
			<button
				onClick={() => {
					onSend(input);
					setInput("");
				}}
				disabled={loading || !input}>
				Send
			</button>
		</div>
	);
}
