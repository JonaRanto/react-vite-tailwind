import { useContext, useEffect } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
	const currentPath = window.location.pathname;
	let index = currentPath.split("/")[1];
	const context = useContext(ShoppingCartContext);

	const renderView = () => {
		const itemsToRender =
			context.searchByTitle?.length > 0 || !!index
				? context.filteredItems
				: context.items;

		if (itemsToRender?.length > 0) {
			return itemsToRender.map((item) => <Card key={item.id} data={item} />);
		} else {
			return <div>We don't have anything</div>;
		}
	};

	useEffect(() => {
		context.setSearchByCategory(index);
	}, [currentPath]);

	return (
		<Layout>
			<div className="flex items-center justify-center relative w-80 mb-4">
				<h1 className="font-medium text-xl">Exclusive Products</h1>
			</div>
			<input
				className="rounded-lg border border-black w-80 p-4 mb-4"
				type="text"
				placeholder="Search a product"
				onChange={(event) => context.setSearchByTitle(event.target.value)}
			/>
			<div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
				{renderView()}
			</div>
			<ProductDetail />
		</Layout>
	);
}

export default Home;
