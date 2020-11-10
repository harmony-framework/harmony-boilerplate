export const makeReducer = (cartName: any, actionTypes: any) => {
	const initialState = {
		items: [],
	};

	return (state = initialState, action = {
		type: undefined
	}) => {
		const actionItem: any = Object.entries(action).reduce(
			(r, [key, val]) => (key === 'type' ? r : { ...r, [key]: val }),
			{}
		);

		switch (action.type) {
			case actionTypes.ADD:
				return {
					...state,
					items: state.items.find((item: any) => item.id === actionItem.id)
						? state.items.map((item: any) => (
							item.id === actionItem.id
								? {
									...item,
									...actionItem,
									quantity: ((item.quantity || 1) + (actionItem.quantity || 1))
								}
								: item
						))
						: state.items.concat({ ...actionItem, quantity: 1 }),
				};
			case actionTypes.UPDATE:
				return {
					...state,
					items: state.items.map(
						(item: any) => (item.id === actionItem.id ? { ...item, ...actionItem } : item)
					),
				};
			case actionTypes.CLEAR:
				return {
					...state,
					items: [],
				};
			case actionTypes.REMOVE:
				return {
					...state,
					items: state.items.map((item: any) => (
						item.id === actionItem.id
							? { ...item, ...actionItem, quantity: ((item.quantity || 1) - 1) }
							: item
					)).filter((item) => item.quantity === undefined || item.quantity > 0),
				};
			default:
				return state;
		}
	};
};

export default makeReducer;
