import { renderToStaticMarkup } from 'react-dom/server';
import { initialize } from 'react-localize-redux';
import Store from '@base/features/base-store';
import { languageTypes, translations } from 'translation';

Store.dispatch(
	initialize({
		languages: languageTypes,
		translation: translations,
		options: {
			renderToStaticMarkup,
			defaultLanguage: 'en'
		}
	})
);
