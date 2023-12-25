"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
export default function Shipping() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [shipping, setShipping] = useState<any | null>();
	const getShipping = async () => {
		const { data: shipping } = await supabase.from("shipping").select();
		console.log(shipping);
		setShipping(shipping);
	};

	useEffect(() => {
		getShipping();
	}, []);

	return (
		<div className="pb-10 px-2">
			<p className="text-secondary_fg font-medium text-center text-2xl mb-10">
				Shipping
			</p>
			<div className="grid grid-cols-3 text-primary_fg mx-auto min-w-[300px] max-w-[500px] text-center rounded shadow-lg shadow-secondary_bg px-2 py-4">
				<p>Quantity</p>
				<p>Express</p>
				<p>Next Day</p>
			</div>
			<div>
				{shipping ? (
					shipping.map((info: any) => (
						<div
							key={info.id}
							className="grid grid-cols-3 text-primary_fg mx-auto min-w-[300px] max-w-[500px] text-center rounded shadow-sm shadow-secondary_bg px-2 py-4"
						>
							<p>
								{info.lower_range} - {info.upper_range}
							</p>
							<p>{formatter.format(info.express)}</p>
							<p>{formatter.format(info.next_day)}</p>
						</div>
					))
				) : (
					<div className="text-primary_fg font-medium text-xl text-center">
						Loading...
					</div>
				)}
			</div>
			<div className="text-primary_fg text-center mt-4">
				<p>Contact us for larger orders</p>
			</div>
		</div>
	);
}
