"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useState, useEffect } from "react";
var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
export default function Menu() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
	const [rotiMenu, setRotiMenu] = useState();
	const getMenu = async () => {
		const { data: menu } = await supabase.from("menu").select();
		console.log(menu);
		setRotiMenu(menu);
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<div className="my-10">
			<p className="text-secondary_fg font-medium text-center text-2xl mb-14">
				Menu
			</p>
			<div className="flex justify-evenly flex-wrap gap-y-14">
				{rotiMenu ? (
					rotiMenu.map((roti) => (
						<div
							key={roti.id}
							className="text-primary_fg w-[200px] rounded shadow-lg shadow-secondary_bg px-2 pb-4 pt-10 relative"
						>
							<Image
								src={`/images/menu/${roti.photo}`}
								width={50}
								height={50}
								className="rounded-[100%] w-[70px] h-[70px] absolute -top-8 left-1/2 transform -translate-x-1/2"
							/>
							<p className="text-center text-md">{roti.name}</p>
							<div className="flex justify-evenly items-center mt-4">
								<p className="text-secondary_fg">
									{formatter.format(roti.price)}
								</p>
								<button className="text-primary_bg bg-primary_fg px-2 py-2 rounded">
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
