export interface VoiceMessage {
	id: string;
	sender: "user" | "ai";
	text: string;
	audioUrl?: string;
}
