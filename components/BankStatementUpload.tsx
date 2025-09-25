import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

interface BankStatementUploadProps {
	onUpload: (file: File) => void;
	loading: boolean;
	error?: string;
}

export function BankStatementUpload({ onUpload, loading, error }: BankStatementUploadProps) {
	return (
		<Card className="max-w-md mx-auto p-6 flex flex-col items-center gap-4 shadow-lg">
			<div className="flex flex-col items-center gap-2">
				<UploadIcon size={36} className="text-indigo-600" />
				<h2 className="text-xl font-bold text-indigo-700 dark:text-white">
					Upload Bank Statement
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-300 text-center">
					Supported formats: PDF, CSV. Secure and private.
				</p>
			</div>
			<label className="w-full">
				<input
					type="file"
					accept=".pdf,.csv"
					className="hidden"
					id="bank-upload"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							onUpload(e.target.files[0]);
						}
					}}
					disabled={loading}
				/>
				<Button
					className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
					disabled={loading}>
					{loading ? "Uploading..." : "Choose File"}
				</Button>
			</label>
			{loading && (
				<div className="w-full text-center text-indigo-600 text-sm mt-2">
					Uploading your statement...
				</div>
			)}
			{error && <div className="w-full text-center text-red-600 text-sm mt-2">{error}</div>}
		</Card>
	);
}
