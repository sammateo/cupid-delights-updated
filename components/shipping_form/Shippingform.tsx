import React from "react";

export default function Shippingform() {
	return (
		<div>
			<p className="text-secondary_fg font-medium text-center text-2xl mb-4">
				Shipping Details
			</p>
			<form className="flex flex-col gap-2 text-primary_fg justify-center w-11/12 max-w-[700px] mx-auto text-center rounded my-2">
				<label className="">Name</label>
				<input type="text" name="to_name" required className="shipping_input" />
				<label>Phone Number</label>
				<input
					type="tel"
					name="contact_number"
					required
					className="shipping_input"
				/>
				<label>Email</label>
				<input
					type="email"
					name="to_email"
					required
					className="shipping_input"
				/>
				<label>Address</label>
				<input type="text" name="address" required className="shipping_input" />
				<label>Postcode</label>
				<input type="text" name="postal" required className="shipping_input" />
				<label>Country</label>
				<input type="text" name="country" required className="shipping_input" />
				<label>Order</label>
				<textarea
					name="message"
					readOnly
					className="shipping_input overflow-y-scroll border-2"
				/>
				<label>Additional Info</label>
				<textarea
					name="addInfo"
					placeholder="Notes for order"
					className="shipping_input"
				/>
				<button
					type="submit"
					value="Send"
					className="bg-primary_fg text-primary_bg py-1 px-20 mt-2 text-lg rounded w-fit mx-auto"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
