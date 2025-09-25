export interface DuplicateTransaction {
	id: string;
	originalId: string;
	date: string;
	description: string;
	amount: number;
	confirmed: boolean;
}
