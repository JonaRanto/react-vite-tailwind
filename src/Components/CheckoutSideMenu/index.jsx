import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
	const context = useContext(ShoppingCartContext);

	const handleDelete = (id) => {
		const filteredProducts = context.cartProducts.filter(
			(product) => product.id !== id
		);
		context.setCartProducts(filteredProducts);
		context.setCount(context.count - 1);
	};

	const handleCheckout = () => {
		const orderToAdd = {
			date: "01/02/2023",
			products: context.cartProducts,
			totalProducts: context.cartProducts.length,
			totalPrice: totalPrice(context.cartProducts),
		};

		context.setOrder([...context.order, orderToAdd]);
		context.setCartProducts([]);
		context.setCount(0);
		context.closeCheckoutSideMenu();
	};

	return (
		<aside
			className={`${
				!!context.isCheckoutSideMenuOpen ? "flex" : "hidden"
			} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className="flex justify-between items-center p-6">
				<h2 className="font-medium text-xl">My Order</h2>
				<div>
					<XMarkIcon
						className="w-6 h-6 cursor-pointer"
						onClick={() => context.closeCheckoutSideMenu()}
					/>
				</div>
			</div>
			<div className="px-6 overflow-y-scroll flex-1">
				{context.cartProducts.map((product) => (
					<OrderCard
						key={product.id}
						id={product.id}
						title={product.title}
						imageUrl={product.images}
						price={product.price}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<div className="px-6 mb-6">
				<p className="flex justify-between items-center mb-2">
					<span className="font-light">Total:</span>
					<span className="text-2xl">${totalPrice(context.cartProducts)}</span>
				</p>
				<Link to="my-orders/last">
					{context.cartProducts.length !== 0 ? (
						<button
							className="w-full bg-black py-3 text-white rounded-lg"
							onClick={() => handleCheckout()}
						>
							Checkout
						</button>
					) : (
						<button
							className="w-full bg-black/30 py-3 text-white/70 rounded-lg"
							disabled
						>
							Checkout
						</button>
					)}
				</Link>
			</div>
		</aside>
	);
};

export default CheckoutSideMenu;
