"use client";
import { BankStatementUpload } from "@/components/BankStatementUpload";
import { useBankStatementUpload } from "@/hooks/useBankStatementUpload";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UploadPage() {
	const { upload, loading, error } = useBankStatementUpload();
	const router = useRouter();

	const handleUpload = async (file: File) => {
		await upload(file);
		// After upload, go to transactions page
		router.push("/transactions");
	};

	return <BankStatementUpload onUpload={handleUpload} loading={loading} error={error} />;
}
