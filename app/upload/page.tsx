"use client";
import { BankStatementUpload } from "@/components/BankStatementUpload";
import { useBankStatementUpload } from "@/hooks/useBankStatementUpload";
import { useRouter } from "next/navigation";

export default function UploadPage() {
	const { upload, loading, error, fileName } = useBankStatementUpload();
	const router = useRouter();

	const handleUpload = async (file: File) => {
		await upload(file);
		// After upload, go to transactions page
		router.push("/transactions");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh]">
			<BankStatementUpload onUpload={handleUpload} loading={loading} error={error} />
			{fileName && (
				<div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
					Selected file: <span className="font-semibold">{fileName}</span>
				</div>
			)}
		</div>
	);
}
