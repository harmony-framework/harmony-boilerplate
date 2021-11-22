/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import get_latestDevicesWithCustomResponseCodeResponse from './responses/devices/get_latestDevicesWithCustomResponseCode.json';
import { API_TYPES } from './interface';

const get_latestDevicesWithCustomResponseCode = rest.get('*/getlatestWithCustomResponseCode', (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json(get_latestDevicesWithCustomResponseCodeResponse),
	);
});

const handlersMap: { [key in API_TYPES]: any} = {
	get_latestDevicesWithCustomResponseCode,
};

export default handlersMap;
