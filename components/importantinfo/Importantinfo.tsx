"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
function Importantinfo() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	const [importantInfo, setImportantInfo] = useState<any | null>(null);
	const getImportantInfo = async () => {
		const { data: importantInfo } = await supabase
			.from("important_info")
			.select();
		console.log(importantInfo);
		setImportantInfo(importantInfo);
	};

	useEffect(() => {
		getImportantInfo();
	}, []);

	return (
		<div className="pb-5">
			<p className="text-secondary_fg font-medium text-center text-2xl mb-10">
				Important Information
			</p>
			<div>
				{importantInfo ? (
					importantInfo.map((info: any) => (
						<div
							key={info.id}
							className="text-primary_fg mx-auto min-w-[300px] max-w-[500px] text-center rounded shadow-lg shadow-secondary_bg px-2 py-4 mb-2"
						>
							<p>{info.text}</p>
						</div>
					))
				) : (
					<div className="text-primary_fg font-medium text-xl text-center">
						Loading...
					</div>
				)}
			</div>
		</div>
	);
}

export default Importantinfo;
