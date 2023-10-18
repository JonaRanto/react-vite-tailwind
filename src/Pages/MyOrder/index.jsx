import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { ShoppingCartContext } from "../../Context";

function MyOrder() {
	const context = useContext(ShoppingCartContext);
	const currentPath = window.location.pathname;
	let index = currentPath.split("/")[2];

	if (index === "last") {
		index = context.order?.length - 1;
	}

	return (
		<Layout>
			<div className="flex w-80 items-center justify-center relative mb-6">
				<Link to="/my-orders" className="absolute left-0">
					<ChevronLeftIcon className="w-6 h-6 text-black cursor-pointer" />
				</Link>
				<h1> MyOrder </h1>
			</div>
			<div className="flex flex-col w-80">
				{context.order?.[index]?.products.map((product) => (
					<OrderCard
						key={product.id}
						id={product.id}
						title={product.title}
						imageUrl={product.images}
						price={product.price}
					/>
				))}
			</div>
		</Layout>
	);
}

export default MyOrder;
