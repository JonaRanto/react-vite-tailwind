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

	// Get Products by title
	const [searchByCategory, setSearchByCategory] = useState(null);

	useEffect(() => {
		fetch(`${apiUrl}/products`)
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
			});
	}, []);

	const filteredItemsByTitle = (items, searchByTitle) => {
		return items?.filter((item) =>
			item.title.toLowerCase().includes(searchByTitle.toLowerCase())
		);
	};

	const filteredItemsByCategory = (items, searchByCategory) => {
		return items?.filter((item) =>
			item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
		);
	};

	const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
		switch (searchType) {
			case "BY_TITLE_AND_CATEGORY":
				return filteredItemsByTitle(
					filteredItemsByCategory(items, searchByCategory),
					searchByTitle
				);
			case "BY_TITLE":
				return filteredItemsByTitle(items, searchByTitle);
			case "BY_CATEGORY":
				return filteredItemsByCategory(items, searchByCategory);
			default:
				return items;
		}
	};

	useEffect(() => {
		if (!!searchByTitle && !!searchByCategory)
			setFilteredItems(
				filterBy(
					"BY_TITLE_AND_CATEGORY",
					items,
					searchByTitle,
					searchByCategory
				)
			);
		if (!!searchByTitle && !searchByCategory)
			setFilteredItems(
				filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
			);
		if (!searchByTitle && !!searchByCategory)
			setFilteredItems(
				filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
			);
		if (!searchByTitle && !searchByCategory)
			setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
		
	}, [items, searchByTitle, searchByCategory]);

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
				filteredItems,
				setItems,
				searchByTitle,
				setSearchByTitle,
				searchByCategory,
				setSearchByCategory,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
