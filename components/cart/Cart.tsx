"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useState, useEffect } from "react";
var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
import { IoClose } from "react-icons/io5";
function Cart({ setShowCart }: any) {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [rotiMenu, setRotiMenu] = useState<any | null>();
	const getMenu = async () => {
		const { data: menu } = await supabase.from("menu").select();
		console.log(menu);
		setRotiMenu(menu);
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<div className="text-primary_fg backdrop-filter backdrop-blur-sm bg-opacity-10  border border-primary_fg mx-auto min-w-[300px] max-w-[500px] text-center rounded shadow-lg shadow-secondary_bg px-2 py-4 mb-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<div className="flex justify-between items-center">
				<p className="text-secondary_fg text-xl">Cart</p>
				<IoClose
					className="text-2xl hover:cursor-pointer"
					onClick={() => {
						setShowCart(false);
					}}
				/>
			</div>
			<div>
				{rotiMenu ? (
					rotiMenu.map((roti: any) => (
						<div
							key={roti.id}
							className="bg-primary_bg mx-10 my-2 py-2 px-4 text-left rounded border border-secondary_fg relative"
						>
							<Image
								src={`/images/menu/${roti.photo}`}
								width={50}
								height={50}
								alt={roti.name}
								className="rounded-[100%] w-[50px] h-[50px] absolute -left-9 top-1/2 transform -translate-y-1/2 border-2 border-secondary_fg"
							/>
							<div>
								<p>{roti.name}</p>
								<p>{formatter.format(roti.price)}</p>
							</div>
						</div>
					))
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

export default Cart;
