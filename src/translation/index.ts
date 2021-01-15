import * as _ from 'lodash';
import { NamedLanguage } from 'react-localize-redux';
import heb from './json/heb.json';
import en from './json/en.json';

export const languageTypes: string[] | NamedLanguage[] = ['heb', 'en'];

const mapTranslations = () => {
	const translations = {};
	_.keys(heb).forEach((key: string) => {
		translations[key] = {};
		_.each(_.keys(heb[key]), (innerKey: string) => {
			translations[key][innerKey] = [
				heb[key][innerKey],
				en[key][innerKey]
			];
		});
	});
	return translations;
};

export const translations = mapTranslations();

