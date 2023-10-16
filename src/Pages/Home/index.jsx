import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import { apiUrl } from "../../Api";
import ProductDetail from "../../Components/ProductDetail";

function Home() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(`${apiUrl}/products`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<Layout>
			Home
			<div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
				{items?.map((item) => {
					return <Card key={item.id} data={item} />;
				})}
			</div>
			<ProductDetail />
		</Layout>
	);
}

export default Home;
