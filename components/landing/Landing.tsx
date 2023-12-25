import React from "react";
import Image from "next/image";

export default function Landing({ setShowCart }: any) {
	return (
		<div className="flex flex-wrap mt-10 justify-center items-center mx-5">
			<div className=" max-w-[500px]">
				<h1 className="text-secondary_fg font-medium text-4xl">
					Homemade Caribbean Rotis
				</h1>
				<p className="text-primary_fg font-medium my-2">
					Cupid Delights aims to satisfy your taste buds & give you a taste of
					"home"
				</p>
				<button
					onClick={() => setShowCart(true)}
					className="text-primary_bg bg-secondary_fg px-4 py-2 rounded block mx-auto sm:mx-0"
				>
					Order Now
				</button>
			</div>
			<div>
				<Image
					src="/images/cooking.png"
					width={500}
					height={500}
					alt="Picture of the author"
				/>
			</div>
		</div>
	);
}
