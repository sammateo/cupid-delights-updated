var formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "GBP",
});
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";
init("user_0452qsSu7KBjTA92mFxpX");
import { useRouter } from "next/navigation";
export default function Shippingform({
	cart,
	shipping,
	shippingType,
	getSubTotal,
	getQuantity,
}: any) {
	const router = useRouter();

	const getOrder = () => {
		let order = "Order Summary: \n";
		cart.forEach((item: any) => {
			if (item.quantity > 0) {
				order += `${item.quantity} of ${item.name} @ ${formatter.format(
					item.price
				)}\n`;
			}
		});
		order += `Subtotal: ${formatter.format(getSubTotal())}\n`;
		order += `Shipping: ${formatter.format(getShippingPrice())}\n`;
		order += `Shipping Type: ${
			shippingType === "express" ? "Express" : "Guaranteed Next Day"
		}\n`;
		order += `Total: ${formatter.format(getTotal())}`;

		return order;
	};
	const getShippingPrice = () => {
		let shipping_price = 0;
		shipping.map((ship: any) => {
			if (
				getQuantity() >= ship.lower_range &&
				getQuantity() <= ship.upper_range
			) {
				if (shippingType == "express") {
					shipping_price = ship.express;
				} else {
					shipping_price = ship.next_day;
				}
			}
		});
		return shipping_price;
	};
	const getTotal = () => {
		return getSubTotal() + getShippingPrice();
	};
	function sendEmail(e: any) {
		e.preventDefault();
		alert("Check your email for order confirmation and payment details.");
		emailjs
			.sendForm(
				"service_hl0g155",
				"template_dica989",
				e.target,
				"user_0452qsSu7KBjTA92mFxpX"
			)
			.then(
				(result) => {
					// toast
				},
				(error) => {
					// toast
					// console.log(error.text);
				}
			);
		(document.getElementById(
			"shipping_details_form"
		) as HTMLFormElement)!.reset();
		sessionStorage.removeItem("cartData");
		sessionStorage.removeItem("shipping_type");
		router.push("/");
	}

	return (
		<div id="shipping_form">
			<p className="text-secondary_fg font-medium text-center text-2xl mb-4">
				Shipping Details
			</p>
			<form
				id="shipping_details_form"
				onSubmit={sendEmail}
				className="flex flex-col gap-2 text-primary_fg justify-center w-11/12 max-w-[700px] mx-auto text-center rounded my-2"
			>
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
					value={getOrder()}
					className="shipping_input border-2 border-dashed px-2 h-32"
				/>
				<label>Additional Info</label>
				<textarea
					name="addInfo"
					placeholder="Notes for order"
					className="shipping_input px-2"
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
