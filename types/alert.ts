export interface Alert {
	id: string;
	type: "suspicious" | "info";
	message: string;
	date: string;
	disputed?: boolean;
}
