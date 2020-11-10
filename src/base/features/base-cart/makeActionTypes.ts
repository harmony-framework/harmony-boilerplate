const PREFIX = '@cart';

export const makeActionTypes = (cartName: any) => ({
	ADD: `${PREFIX}/${cartName}/ADD_ITEM`,
	REMOVE: `${PREFIX}/${cartName}/REMOVE_ITEM`,
	UPDATE: `${PREFIX}/${cartName}/UPDATE_ITEM`,
	CLEAR: `${PREFIX}/${cartName}/CLEAR_ALL_ITEMS`,
});

export default makeActionTypes;
