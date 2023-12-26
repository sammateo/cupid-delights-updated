import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
export default function Footer() {
	return (
		<div id="contact" className="bg-secondary_bg text-primary_bg py-5 px-5">
			<p className="text-primary_fg font-medium text-center text-2xl">
				Contact Information
			</p>
			<div className="flex flex-wrap justify-evenly items-center gap-5 max-w-[600px] mx-auto mt-4">
				<div className=" min-w-[320px] text-center">
					<Link href="https://wa.me/447432577502">
						<p>Call/Whatsapp +44 7432 577502</p>
					</Link>
					<Link href="mailto:cupidelights@gmail.com">
						<p>Email cupidelights@gmail.com</p>
					</Link>
				</div>
				<div className="flex justify-evenly gap-2 text-center">
					<Link
						href="https://www.facebook.com/Cupid-Delights-103544264841798/?tn-str=k*F"
						target="_blank"
					>
						<FaFacebook className="text-2xl" />
					</Link>
					<Link
						href="https://www.instagram.com/cupidelights/?hl=en"
						target="_blank"
					>
						<FaInstagram className="text-2xl" />
					</Link>
				</div>
			</div>
		</div>
	);
}
