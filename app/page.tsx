import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/navbar/Navbar";
import Landing from "@/components/landing/Landing";
import Process from "@/components/process/Process";
import Menu from "@/components/menu/Menu";
import Shipping from "@/components/shipping/Shipping";
export default function Home() {
	return (
		<main className="">
			<Navbar />
			<Landing />
			<Process />
			<Menu />
			<Shipping />
		</main>
	);
}
