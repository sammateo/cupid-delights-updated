import Image from "next/image";
import React from "react";
let process_steps = [
	{
		id: "1",
		image: "/images/shopping.png",
		text: "Order Your Rotis",
	},
	{
		id: "2",
		image: "/images/delivered.png",
		text: "Delivered to your door",
	},
	{
		id: "3",
		image: "/images/eat_together.png",
		text: "Reheat and Enjoy",
	},
];
export default function Process() {
	return (
		<div className=" bg-secondary_bg px-2 pt-3 pb-10">
			<p className="text-primary_fg font-medium text-center text-2xl mb-10">
				The Process
			</p>
			<div className="flex justify-evenly flex-wrap gap-2">
				{process_steps.map((process) => (
					<div
						key={process.id}
						className=" bg-primary_bg py-2 px-3 w-[150px] rounded shadow-md shadow-secondary_bg"
					>
						<Image
							src={process.image}
							width={100}
							height={80}
							className="mx-auto"
							alt={process.text}
						/>
						<p className="text-primary_fg text-wrap text-center">
							{process.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
