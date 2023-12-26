"use client";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Shippingform from "@/components/shipping_form/Shippingform";
var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
export default function page() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [cart, setCart] = useState<any | null>(null);
	const getCart = async () => {
		if (sessionStorage.getItem("cartData")) {
			setCart(JSON.parse(sessionStorage.getItem("cartData")!));
			return;
		}
		const { data: menu, error } = await supabase.from("menu").select();
		if (error) {
			return;
		}
		setCart(menu);
		sessionStorage.setItem("cartData", JSON.stringify(menu));
	};
	const [shipping, setShipping] = useState<any | null>();
	const [shippingType, setShippingType] = useState<any | null>("next_day");

	const [showShippingForm, setShowShippingForm] = useState<boolean>(false);
	const onShippingTypeChanged = (e: React.FormEvent<HTMLInputElement>) => {
		setShippingType(e.currentTarget.value);
		setShowShippingForm(false);
	};
	const getSubTotal = () => {
		let subTotal = 0;
		if (cart && cart.length > 0) {
			cart.forEach((roti: any) => (subTotal += roti.price * roti.quantity));
		}
		return subTotal;
	};
	const getShipping = async () => {
		const { data: shipping } = await supabase.from("shipping").select();
		setShipping(shipping);
	};
	const getQuantity = () => {
		let quantity = 0;
		if (cart && cart.length > 0) {
			cart.forEach((roti: any) => (quantity += roti.quantity));
		}
		return quantity;
	};
	useEffect(() => {
		getCart();
		getShipping();
	}, []);

	return (
		<div className="flex-1">
			<Navbar />
			<h1 className="text-secondary_fg font-medium text-center text-2xl mb-2 mt-4">
				Checkout
			</h1>
			<div className="flex justify-evenly flex-wrap w-full px-5 py-2">
				<div className=" w-6/12 max-w-[800px] min-w-[300px]">
					{/* Cart */}
					<p className="text-secondary_fg text-xl text-center">My cart</p>
					{cart ? (
						cart.map((roti: any) => (
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
												setCart(
													cart.map((item: any) =>
														item.id === roti.id
															? { ...item, quantity: roti.quantity }
															: item
													)
												);
												sessionStorage.setItem(
													"cartData",
													JSON.stringify(cart)
												);
												setShowShippingForm(false);
											}
										}}
									>
										-
									</button>
									<span>{roti.quantity}</span>
									<button
										onClick={() => {
											roti.quantity++;
											setCart(
												cart.map((item: any) =>
													item.id === roti.id
														? { ...item, quantity: roti.quantity }
														: item
												)
											);
											sessionStorage.setItem("cartData", JSON.stringify(cart));
											setShowShippingForm(false);
										}}
									>
										+
									</button>
								</div>
							</div>
						))
					) : (
						<div>Loading Cart</div>
					)}
				</div>
				<div className=" w-5/12 max-w-[800px] min-w-[300px]">
					<div>
						<p className="text-secondary_fg text-xl text-center mb-2">
							Shipping
						</p>

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
					<div className="my-6">
						<p className="text-secondary_fg text-xl text-center">
							Order Summary
						</p>
						<div className="flex justify-between">
							<p className="">Subtotal</p>
							<p>{formatter.format(getSubTotal())}</p>
						</div>
						<div className="flex justify-between">
							<p className="">Shipping</p>
							<div>
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
							</div>
						</div>
						<div className="flex justify-between border-t-2 border-primary_fg">
							<p className="">Total</p>
							<div>
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
							</div>
						</div>
					</div>
					<div className="">
						{getQuantity() < 6 ? (
							<p className="text-secondary_fg bg-primary_bg text-center py-1 px-5 mt-2 mx-auto text-lg rounded w-8/12 border border-secondary_fg">
								minimum 6 rotis
							</p>
						) : getQuantity() > 40 ? (
							<div>
								<p className="text-secondary_fg bg-primary_bg text-center py-1 px-5 mt-2 mx-auto rounded w-8/12 border border-secondary_fg">
									Contact us for orders over 40 rotis
								</p>
							</div>
						) : (
							<Link href="#shipping_form">
								<button
									className="bg-primary_fg text-primary_bg py-1 px-5 mt-2 text-lg rounded w-full"
									onClick={() => {
										setShowShippingForm(true);
									}}
								>
									Checkout
								</button>
							</Link>
						)}
					</div>
				</div>
			</div>
			{showShippingForm && (
				<Shippingform
					cart={cart}
					shipping={shipping}
					shippingType={shippingType}
					getSubTotal={getSubTotal}
					getQuantity={getQuantity}
				/>
			)}
		</div>
	);
}
