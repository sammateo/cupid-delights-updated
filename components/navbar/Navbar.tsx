export default function Navbar() {
	return (
		<div className="flex flex-wrap justify-center mt-2 mx-auto gap-x-20">
			<p className="text-secondary_fg font-bold px-4 py-2 ">Cupid Delights</p>
			<div className="text-primary_fg flex flex-wrap justify-evenly gap-10 shadow-md shadow-secondary_bg px-4 py-2 rounded-full font-medium">
				<p>Home</p>
				<p>Menu</p>
				<p>Gallery</p>
				<p>Contact</p>
			</div>
		</div>
	);
}
