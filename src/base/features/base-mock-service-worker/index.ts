/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'config';

const prepareServiceWorkerForMockAPIs = () => {
	// eslint-disable-next-line no-console
	console.log(`%c[MSW] Mocking Type: ${config.MOCK_TYPE}`, 'color:blue; font-weight: bold;');
	const { worker } = require('./browser');
	worker.start({
		onUnhandledRequest: 'bypass',
		serviceWorker: {
			url: '/mockServiceWorker.js'
		}
	});
};

const mock = config.USE_MOCK && prepareServiceWorkerForMockAPIs();
export default mock;
