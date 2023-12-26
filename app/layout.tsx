import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Notices from "@/components/notices/Notices";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cupid Delights",
	description: "Homemade Caribbean Rotis",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + " min-h-[100vh] flex flex-col"}>
				<Notices />
				{children}
				<Footer />
			</body>
		</html>
	);
}
