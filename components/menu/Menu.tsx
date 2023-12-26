"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useState, useEffect } from "react";
var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
export default function Menu({ setShowCart }: any) {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [rotiMenu, setRotiMenu] = useState<any | null>();
	const getMenu = async () => {
		const { data: menu } = await supabase.from("menu").select();
		setRotiMenu(menu);
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<div className="py-10" id="menu">
			<p className="text-secondary_fg font-medium text-center text-2xl mb-14">
				Menu
			</p>
			<div className="flex justify-evenly flex-wrap gap-y-14">
				{rotiMenu ? (
					rotiMenu.map((roti: any) => (
						<div
							key={roti.id}
							className="text-primary_fg w-[200px] rounded shadow-lg shadow-secondary_bg px-2 pb-4 pt-10 relative"
						>
							<Image
								src={`/images/menu/${roti.photo}`}
								width={50}
								height={50}
								alt={roti.name}
								className="rounded-[100%] w-[80px] h-[80px] absolute -top-10 left-1/2 transform -translate-x-1/2 border-2 border-secondary_fg"
							/>
							<p className="text-center text-md">{roti.name}</p>
							<div className="flex justify-evenly items-center mt-4">
								<p className="text-secondary_fg">
									{formatter.format(roti.price)}
								</p>
								<button
									onClick={() => {
										setShowCart(true);
									}}
									className="text-primary_bg bg-primary_fg px-2 py-2 rounded"
								>
									Order Now
								</button>
							</div>
						</div>
					))
				) : (
					<div className="text-primary_fg font-medium text-xl text-center">
						Loading Menu...
					</div>
				)}
			</div>
		</div>
	);
}
