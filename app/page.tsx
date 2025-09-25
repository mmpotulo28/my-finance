"use client";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900 font-sans">
			<header className="flex flex-col items-center justify-center py-8 gap-2">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={120}
					height={32}
					priority
				/>
				<h1 className="text-2xl font-bold text-indigo-700 dark:text-white mt-2">
					My Finance Adviser
				</h1>
				<p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-md">
					AI-powered personal finance app. Upload your bank statements, get smart advice,
					manage budgets, and more.
				</p>
			</header>
			<main className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
				<div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
					<h2 className="text-lg font-semibold text-indigo-600 dark:text-white">
						Quick Actions
					</h2>
					<ul className="grid grid-cols-2 gap-3">
						<li>
							<a
								href="/upload"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Upload
							</a>
						</li>
						<li>
							<a
								href="/transactions"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Transactions
							</a>
						</li>
						<li>
							<a
								href="/advice"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Advice
							</a>
						</li>
						<li>
							<a
								href="/budget"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Budget
							</a>
						</li>
						<li>
							<a
								href="/alerts"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Alerts
							</a>
						</li>
						<li>
							<a
								href="/duplicates"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Duplicates
							</a>
						</li>
						<li>
							<a
								href="/investments"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Investments
							</a>
						</li>
						<li>
							<a
								href="/accessibility"
								className="block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-white rounded-lg p-3 text-center font-medium shadow hover:bg-indigo-200 dark:hover:bg-indigo-800 transition">
								Accessibility
							</a>
						</li>
					</ul>
				</div>
			</main>
		</div>
	);
}
