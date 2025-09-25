"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	UploadIcon,
	ListIcon,
	LightbulbIcon,
	WalletIcon,
	BellIcon,
	MenuIcon,
	RepeatIcon,
	PiggyBankIcon,
	AccessibilityIcon,
} from "lucide-react";
import { useState } from "react";

const mainTabs = [
	{ label: "Upload", href: "/upload", icon: <UploadIcon size={18} /> },
	{ label: "Transactions", href: "/transactions", icon: <ListIcon size={18} /> },
	{ label: "Advice", href: "/advice", icon: <LightbulbIcon size={18} /> },
	{ label: "Budget", href: "/budget", icon: <WalletIcon size={18} /> },
	{ label: "Alerts", href: "/alerts", icon: <BellIcon size={18} /> },
];

const extraTabs = [
	{ label: "Duplicates", href: "/duplicates", icon: <RepeatIcon size={18} /> },
	{ label: "Investments", href: "/investments", icon: <PiggyBankIcon size={18} /> },
	{ label: "Accessibility", href: "/accessibility", icon: <AccessibilityIcon size={18} /> },
];

export function MobileTabs() {
	const router = useRouter();
	const [showMore, setShowMore] = useState(false);

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t flex justify-around items-center h-16 z-50 shadow-md">
			{mainTabs.map((tab) => (
				<Button
					key={tab.href}
					variant="ghost"
					size="sm"
					className="flex-1 rounded-none text-xs flex flex-col items-center gap-1"
					onClick={() => router.push(tab.href)}>
					{tab.icon}
					<span>{tab.label}</span>
				</Button>
			))}
			<div className="relative flex-1">
				<Button
					variant="ghost"
					size="sm"
					className="w-full rounded-none text-xs flex flex-col items-center gap-1"
					onClick={() => setShowMore((v) => !v)}>
					<MenuIcon size={18} />
					<span>More</span>
				</Button>
				{showMore && (
					<div className="absolute bottom-16 left-0 right-0 bg-white dark:bg-black border rounded shadow-lg p-2 flex flex-col z-50">
						{extraTabs.map((tab) => (
							<Button
								key={tab.href}
								variant="ghost"
								size="sm"
								className="w-full flex items-center gap-2 text-xs justify-start"
								onClick={() => {
									router.push(tab.href);
									setShowMore(false);
								}}>
								{tab.icon}
								<span>{tab.label}</span>
							</Button>
						))}
					</div>
				)}
			</div>
		</nav>
	);
}
