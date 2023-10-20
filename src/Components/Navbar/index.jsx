import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
	const context = useContext(ShoppingCartContext);
	const activeStyle = "underline underline-offset-4";

	return (
		<nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
			<ul className="flex items-center gap-3">
				<li className="font-semibold text-lg">
					<NavLink to="/">Shopi</NavLink>
				</li>
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						All
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/azul"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Clothes
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/iphone"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Electronics
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/gorra"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Furnitures
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/m"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Toys
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/otherss"
						className={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Others
					</NavLink>
				</li>
			</ul>
			<ul className="flex items-center gap-3">
				<li className="text-black/60">jonathan@ranto.cl</li>
				<li>
					<NavLink to="/my-orders">My Orders</NavLink>
				</li>
				<li>
					<NavLink to="/my-account">My Account</NavLink>
				</li>
				<li>
					<NavLink to="/sign-in">Sign In</NavLink>
				</li>
				<li className="flex items-center">
					<ShoppingBagIcon className="w-6 h-6" />
					{context.count}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
