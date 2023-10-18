import {
	CalendarIcon,
	ChevronRightIcon,
	ShoppingBagIcon
} from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
	const { totalProducts, totalPrice } = props;

	return (
		<div className="flex justify-between items-center w-80 border border-grey rounded-lg px-5 py-3">
			<div className="flex flex-col">
				<span className="flex items-center text-sm">
					<CalendarIcon className="w-4 h-4 mx-2" />
					01/02/2023
				</span>
				<span className="flex items-center text-sm">
					<ShoppingBagIcon className="w-4 h-4 mx-2" />
					{totalProducts}
				</span>
			</div>
			<div className="flex items-center gap-3">
				<span className="flex items-center text-xl font-semibold">${totalPrice}</span>
				<span>
					<ChevronRightIcon className="w-6 h-6" />
				</span>
			</div>
		</div>
	);
};

export default OrdersCard;
