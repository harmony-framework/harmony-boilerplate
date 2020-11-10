// @ts-nocheck
import { STORE_ACTION_LISTENERS } from './serviceTags';

/* --------- custom event listeners ------- */
const events = (() => {
	const topics = {};
	const hOP = topics.hasOwnProperty;

	return {
		subscribe(topic = STORE_ACTION_LISTENERS, listener) {
			// Create the topic's object if not yet created
			if (!hOP.call(topics, topic)) topics[topic] = [];

			// Add the listener to queue
			const index = topics[topic].push(listener) - 1;

			// Provide handle back for removal of topic
			return {
				remove() {
					delete topics[topic][index];
				}
			};
		},
		publish(topic = STORE_ACTION_LISTENERS, info) {
			// If the topic doesn't exist, or there's no listeners in queue, just leave
			if (!hOP.call(topics, topic)) return;

			// Cycle through topics queue, fire!
			// tslint:disable-next-line:ter-prefer-arrow-callback
			topics[topic].forEach((item) => {
				item(info !== undefined ? info : {});
			});
		}
	};
})();

export const globalStoreListener = events;

if (typeof window !== 'undefined') {
	window.addGlobalStoreListener = (listener) => globalStoreListener.subscribe(STORE_ACTION_LISTENERS, listener);
}

export default globalStoreListener;
