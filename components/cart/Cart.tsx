"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
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
	const [shipping, setShipping] = useState<any | null>();
	const [shippingType, setShippingType] = useState<any | null>("next_day");
	const onShippingTypeChanged = (e: React.FormEvent<HTMLInputElement>) => {
		setShippingType(e.currentTarget.value);
	};

	const getMenu = async () => {
		if (sessionStorage.getItem("cartData")) {
			setRotiMenu(JSON.parse(sessionStorage.getItem("cartData")!));
			return;
		}
		const { data: menu, error } = await supabase.from("menu").select();
		if (error) {
			return;
		}
		setRotiMenu(menu);
		sessionStorage.setItem("cartData", JSON.stringify(menu));
	};
	const getShipping = async () => {
		const { data: shipping } = await supabase.from("shipping").select();
		setShipping(shipping);
	};

	const getSubTotal = () => {
		let subTotal = 0;
		rotiMenu.forEach((roti: any) => (subTotal += roti.price * roti.quantity));
		return subTotal;
	};

	const getQuantity = () => {
		let quantity = 0;
		console.log(rotiMenu);
		if (rotiMenu && rotiMenu.length > 0) {
			rotiMenu.forEach((roti: any) => (quantity += roti.quantity));
		}
		console.log(quantity);
		return quantity;
	};

	useEffect(() => {
		getMenu();
		getShipping();
	}, []);

	return (
		<div className="text-primary_fg backdrop-filter backdrop-blur-sm bg-opacity-10 border border-primary_fg mx-auto min-w-[350px] max-w-[700px] text-center rounded shadow-lg shadow-secondary_bg px-2 py-4 mb-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<div className="flex justify-between items-center text-secondary_fg">
				<p className=" text-xl font-medium">Cart</p>
				<IoClose
					className="text-2xl hover:cursor-pointer"
					onClick={() => {
						setShowCart(false);
					}}
				/>
			</div>
			<div>
				{rotiMenu ? (
					<div>
						{rotiMenu.map((roti: any) => (
							<div
								key={roti.id}
								className="bg-primary_bg ml-8 my-2 py-2 px-4 text-left rounded border border-secondary_fg relative"
							>
								<Image
									src={`/images/menu/${roti.photo}`}
									width={50}
									height={50}
									alt={roti.name}
									className="rounded-[100%] w-[50px] h-[50px] absolute -left-9 top-1/2 transform -translate-y-1/2 border border-secondary_fg"
								/>
								<div>
									<p>{roti.name}</p>
									<p>{formatter.format(roti.price)}</p>
								</div>
								{/* Quantity buttons */}
								<div className="flex justify-center items-center gap-2 py-0 border border-primary_fg w-1/4 rounded">
									<button
										onClick={() => {
											if (roti.quantity > 0) {
												roti.quantity--;
												setRotiMenu(
													rotiMenu.map((item: any) =>
														item.id === roti.id
															? { ...item, quantity: roti.quantity }
															: item
													)
												);
												sessionStorage.setItem(
													"cartData",
													JSON.stringify(rotiMenu)
												);
											}
										}}
									>
										-
									</button>
									<span>{roti.quantity}</span>
									<button
										onClick={() => {
											roti.quantity++;
											setRotiMenu(
												rotiMenu.map((item: any) =>
													item.id === roti.id
														? { ...item, quantity: roti.quantity }
														: item
												)
											);
											sessionStorage.setItem(
												"cartData",
												JSON.stringify(rotiMenu)
											);
										}}
									>
										+
									</button>
								</div>
							</div>
						))}
						<div>
							<p className="text-secondary_fg text-xl">Shipping</p>

							<div>
								<div className="flex justify-between items-center bg-primary_bg py-2 px-4 text-left rounded border border-secondary_fg">
									<input
										type="radio"
										name="shippingtype"
										id="express"
										value="express"
										checked={shippingType === "express"}
										onChange={onShippingTypeChanged}
									/>
									<p>Express</p>

									{getQuantity() >= 6 && shipping ? (
										shipping.map((ship: any) =>
											getQuantity() >= ship.lower_range &&
											getQuantity() <= ship.upper_range ? (
												<p>{formatter.format(ship.express)}</p>
											) : (
												<></>
											)
										)
									) : (
										<p>minimum 6 rotis</p>
									)}
								</div>
								<div className="flex justify-between items-center bg-primary_bg py-2 px-4 text-left rounded border border-secondary_fg my-2">
									<input
										type="radio"
										name="shippingtype"
										id="next_day"
										value="next_day"
										checked={shippingType === "next_day"}
										onChange={onShippingTypeChanged}
									/>
									<p>Next Day</p>
									{getQuantity() >= 6 && shipping ? (
										shipping.map((ship: any) =>
											getQuantity() >= ship.lower_range &&
											getQuantity() <= ship.upper_range ? (
												<p>{formatter.format(ship.next_day)}</p>
											) : (
												<></>
											)
										)
									) : (
										<p>minimum 6 rotis</p>
									)}
								</div>
							</div>
						</div>
						<div>
							<p className="text-secondary_fg text-xl">Order Summary</p>
							<div className="flex justify-between">
								<p className="">Subtotal</p>
								<p>{formatter.format(getSubTotal())}</p>
							</div>
							<div className="flex justify-between">
								<p className="">Shipping</p>
								<p>
									{getQuantity() >= 6 && shipping ? (
										shipping.map((ship: any) =>
											getQuantity() >= ship.lower_range &&
											getQuantity() <= ship.upper_range ? (
												<p>
													{shippingType == "express"
														? formatter.format(ship.express)
														: formatter.format(ship.next_day)}
												</p>
											) : (
												<></>
											)
										)
									) : (
										<p>minimum 6 rotis</p>
									)}
								</p>
							</div>
							<div className="flex justify-between border-t-2 border-primary_fg">
								<p className="">Total</p>
								<p>
									{getQuantity() >= 6 && shipping ? (
										shipping.map((ship: any) =>
											getQuantity() >= ship.lower_range &&
											getQuantity() <= ship.upper_range ? (
												<p>
													{shippingType == "express"
														? formatter.format(ship.express + getSubTotal())
														: formatter.format(ship.next_day + getSubTotal())}
												</p>
											) : (
												<></>
											)
										)
									) : (
										<p>minimum 6 rotis</p>
									)}
								</p>
							</div>
						</div>
						<div className="">
							{getQuantity() < 6 ? (
								<p className="text-secondary_fg bg-primary_bg py-1 px-5 mt-2 mx-auto text-lg rounded w-8/12 border border-secondary_fg">
									minimum 6 rotis
								</p>
							) : getQuantity() > 40 ? (
								<div>
									<p className="text-secondary_fg bg-primary_bg py-1 px-5 mt-2 mx-auto rounded w-8/12 border border-secondary_fg">
										Contact us for orders over 40 rotis
									</p>
								</div>
							) : (
								<Link href="/checkout">
									<button className="bg-primary_fg text-primary_bg py-1 px-5 mt-2 text-lg rounded w-8/12">
										Checkout
									</button>
								</Link>
							)}
						</div>
					</div>
				) : (
					<div>Loading Your Cart...</div>
				)}
			</div>
		</div>
	);
}

export default Cart;
