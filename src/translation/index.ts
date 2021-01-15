import * as _ from 'lodash';
import { NamedLanguage } from 'react-localize-redux';
import en from './json/en.json';
import fr from './json/fr.json';

export const languageTypes: string[] | NamedLanguage[] = ['en', 'fr'];

const mapTranslations = () => {
	const translations = {};
	_.keys(en).forEach((key: string) => {
		translations[key] = {};
		_.each(_.keys(en[key]), (innerKey: string) => {
			translations[key][innerKey] = [
				en[key][innerKey],
				fr[key][innerKey]
			];
		});
	});
	return translations;
};

export const translations = mapTranslations();

