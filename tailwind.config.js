/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary_bg: "var(--primary-bg)",
				primary_fg: "var(--primary-fg)",
				secondary_fg: "var(--secondary-fg)",
				secondary_bg: "var(--secondary-bg)",
			},
		},
	},
	plugins: [],
};
