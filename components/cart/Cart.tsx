import React from "react";
import { IoClose } from "react-icons/io5";
function Cart({ setShowCart }: any) {
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
		</div>
	);
}

export default Cart;
