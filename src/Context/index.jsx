import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../Api";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
	// Shopping Cart • Increment quantity
	const [count, setCount] = useState(0);

	// Product Detail • Open/Close
	const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
	const openProductDetail = () => setIsProductDetailOpen(true);
	const closeProductDetail = () => setIsProductDetailOpen(false);

	// Checkout Side Menu • Open/Close
	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
	const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
	const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

	// Product Detail • Show product
	const [productToShow, setProductToShow] = useState({});

	// Shopping Cart • Add products to cart
	const [cartProducts, setCartProducts] = useState([]);

	// Shopping Cart • Order
	const [order, setOrder] = useState([]);

	// Get Products
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);

	// Get Products by title
	const [searchByTitle, setSearchByTitle] = useState(null);

	useEffect(() => {
		fetch(`${apiUrl}/products`)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	const filteredItemsByTitle = (items, searchByTitle) => {
		return items?.filter((item) =>
			item.title.toLowerCase().includes(searchByTitle.toLowerCase())
		);
	};

	useEffect(() => {
		console.log("test filtered");
		if (searchByTitle) {
			setFilteredItems(filteredItemsByTitle(items, searchByTitle));
		}
	}, [items, searchByTitle]);

	return (
		<ShoppingCartContext.Provider
			value={{
				count,
				setCount,
				openProductDetail,
				closeProductDetail,
				isProductDetailOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,
				isCheckoutSideMenuOpen,
				setProductToShow,
				productToShow,
				cartProducts,
				setCartProducts,
				order,
				setOrder,
				items,
				setItems,
				searchByTitle,
				setSearchByTitle,
				filteredItems,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
