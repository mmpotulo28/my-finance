import { VoiceMessage } from "@/types/accessibility";
import { useState } from "react";
import { MicIcon, SendIcon, Loader2Icon, BotIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceChatProps {
	messages: VoiceMessage[];
	onSend: (text: string) => void;
	loading: boolean;
}

export function VoiceChat({ messages, onSend, loading }: VoiceChatProps) {
	const [input, setInput] = useState("");
	const [listening, setListening] = useState(false);
	const [aiTyping, setAiTyping] = useState(false);

	const handleSend = () => {
		onSend(input);
		setInput("");
		setAiTyping(true);
		setTimeout(() => setAiTyping(false), 1200); // Simulate AI typing
	};

	const handleListen = () => {
		setListening(true);
		setTimeout(() => {
			setInput("Simulated voice input...");
			setListening(false);
		}, 1500); // Simulate listening
	};

	return (
		<div className="max-w-md mx-auto w-full h-[92vh] flex justify-between flex-col gap-4 p-4 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-black rounded-xl shadow-lg">
			<h2 className="text-xl font-bold text-indigo-700 dark:text-white mb-2 flex items-center gap-2">
				<BotIcon className="text-indigo-500" size={24} />
				Voice-Over Chat
			</h2>
			<div className="flex flex-col gap-2 mb-2">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex items-end gap-2 ${
							msg.sender === "user" ? "justify-end" : "justify-start"
						}`}>
						{msg.sender === "ai" && <BotIcon className="text-indigo-500" size={20} />}
						<div
							className={`rounded-2xl px-4 py-2 max-w-[70%] ${
								msg.sender === "user"
									? "bg-indigo-600 text-white"
									: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-indigo-100 dark:border-gray-700"
							} shadow`}>
							<span>{msg.text}</span>
							{msg.audioUrl && (
								<audio src={msg.audioUrl} controls className="mt-1 w-full" />
							)}
						</div>
						{msg.sender === "user" && (
							<UserIcon className="text-indigo-600" size={20} />
						)}
					</div>
				))}
				{aiTyping && (
					<div className="flex items-end gap-2 justify-start">
						<BotIcon className="text-indigo-500" size={20} />
						<div className="rounded-2xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-indigo-100 dark:border-gray-700 shadow flex items-center gap-2">
							<Loader2Icon className="animate-spin text-indigo-400" size={16} />
							<span>AI is typing...</span>
						</div>
					</div>
				)}
				{listening && (
					<div className="flex items-end gap-2 justify-end">
						<div className="rounded-2xl px-4 py-2 bg-indigo-600 text-white shadow flex items-center gap-2">
							<MicIcon className="animate-pulse" size={16} />
							<span>Listening...</span>
						</div>
						<UserIcon className="text-indigo-600" size={20} />
					</div>
				)}
			</div>
			<div className="flex gap-2 items-center mt-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					disabled={loading || listening}
					placeholder="Type your message or use voice..."
					className="flex-1 rounded-full px-4 py-2 border border-indigo-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none"
				/>
				<Button
					type="button"
					variant="outline"
					size="icon"
					disabled={loading || listening}
					onClick={handleListen}
					aria-label="Voice input">
					<MicIcon size={20} />
				</Button>
				<Button
					type="button"
					variant="default"
					size="icon"
					disabled={loading || !input || listening}
					onClick={handleSend}
					aria-label="Send">
					<SendIcon size={20} />
				</Button>
			</div>
		</div>
	);
}
