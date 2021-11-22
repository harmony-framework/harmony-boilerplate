/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'config';
import BLACK_LIST_IDs from './blackList';
import WHITE_LIST_IDs from './whiteList';
import HANDLER_MAP from './apis';
import { API_TYPES, MOCK_TYPES } from './interface';

const handlerMap = HANDLER_MAP;
const mockType = config.MOCK_TYPE;

const handlerIds: string[] = Object.keys(handlerMap);

const handlerBlackListIds: API_TYPES[] = BLACK_LIST_IDs;
const handlersWhiteListIds: API_TYPES[] = WHITE_LIST_IDs;

const getHandlerList = (type: MOCK_TYPES = MOCK_TYPES.ALL) => {
	let handlerFunctions: Array <any> = [];
	if (type === 'all_list') {
		handlerFunctions = Object.values(handlerMap);
	} if (type === 'white_list') {
		handlersWhiteListIds.forEach((handlerId) => {
			handlerFunctions.push(handlerMap[handlerId]);
		});
	} if (type === 'black_list') {
		handlerIds.forEach((handlerId: API_TYPES) => {
			if (!handlerBlackListIds.includes(handlerId)) {
				handlerFunctions.push(handlerMap[handlerId]);
			}
		});
	}
	return handlerFunctions;
};

const handlerList = getHandlerList(mockType);

export const handlers = [
	...handlerList
];
