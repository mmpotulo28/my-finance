import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";

interface BankStatementUploadProps {
	onUpload: (file: File) => void;
	loading: boolean;
	error?: string;
}

export function BankStatementUpload({ onUpload, loading, error }: BankStatementUploadProps) {
	return (
		<Card>
			<h2>Upload Bank Statement</h2>
			<input
				type="file"
				accept=".pdf,.csv"
				onChange={(e) => {
					if (e.target.files && e.target.files[0]) {
						onUpload(e.target.files[0]);
					}
				}}
				disabled={loading}
			/>
			<Button disabled={loading}>Upload</Button>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</Card>
	);
}
