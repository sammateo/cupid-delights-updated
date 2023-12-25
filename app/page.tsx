"use client";
import Navbar from "../components/navbar/Navbar";
import Landing from "@/components/landing/Landing";
import Process from "@/components/process/Process";
import Menu from "@/components/menu/Menu";
import Shipping from "@/components/shipping/Shipping";
import Importantinfo from "@/components/importantinfo/Importantinfo";
import Cart from "@/components/cart/Cart";
import { useState } from "react";
export default function Home() {
	const [showCart, setShowCart] = useState<boolean>(false);
	return (
		<main className="">
			<Navbar />
			<Landing setShowCart={setShowCart} />
			<Process />
			<Menu setShowCart={setShowCart} />
			<Shipping />
			<Importantinfo />
			{showCart && <Cart setShowCart={setShowCart} />}
		</main>
	);
}
