"use client";
import { useState } from "react";

export function useBankStatementUpload() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [fileName, setFileName] = useState<string | undefined>();

	const upload = async (file: File) => {
		setLoading(true);
		setError(undefined);
		setFileName(file.name);
		try {
			// Simulate upload progress
			await new Promise((resolve) => setTimeout(resolve, 1200));
			// TODO: Implement secure upload logic
			// await uploadService.uploadFile(file);
		} catch (e: any) {
			setError(e.message || "Upload failed");
		} finally {
			setLoading(false);
		}
	};

	return { upload, loading, error, fileName };
}
