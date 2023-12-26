"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
export default function Notices() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [notices, setNotices] = useState<any | null>(null);
	const getNotices = async () => {
		const { data: notices } = await supabase
			.from("notices")
			.select("*")
			.eq("deleted", false);
		console.log(notices);
		setNotices(notices);
	};

	useEffect(() => {
		getNotices();
	}, []);

	return (
		<div>
			{notices &&
				notices.map((info: any) => (
					<div
						key={info.id}
						className="bg-secondary_bg text-primary_fg mx-auto text-center shadow-sm shadow-secondary_bg px-2 py-2"
					>
						<p>{info.text}</p>
					</div>
				))}
		</div>
	);
}
