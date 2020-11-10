
# Multilingual

i18n give you easy way to support with languages and Encapsulate all you titles and static strings in your application<br/>
to one place and easily to rename or change it.

If you are not familiar with `i18n` and you are not sure what is it please read :<br/>
<a href="https://en.wikipedia.org/wiki/Internationalization_and_localization" target="_blank">i18n</a>.<br/>

In Our boilerplate you can easly add and use i18n.<br/>
To use i18n you need to crate a new Locale file ( a json file ) and it map it under `translations`

Once you done with the mapping, the translator utility will be injected to the container and you will able to use it by passing the id of your message.

#### Usage Example

##### add translation to json files 
( in the example to en.json and fr.json)
```json
{
  "deviceGallery": {
    "pageTitle": "gallery",
    "addToCartButton": "add to cart",
    "removeFromCartButton": "remove",
    "priceTitle": "price",
    "clearCartButton": "clear",
    "checkoutButton": "done"
  },
  "checkout": {
    "pageTitle": "done",
    "totalPriceTitle": "final price"
  }
}
```

##### add to array the language key ( 'en', 'fr' in this example)
```JS
import * as _ from 'lodash';
import { NamedLanguage } from 'react-localize-redux';
import en from './json/en.json';
import fr from './json/fr.json';

export const languageTypes: string[] | NamedLanguage[] = ['en', 'fr'];

const mapTranslations = () => {
	const translations = {};
	_.keys(en).forEach((key) => {
		translations[key] = {};
		_.each(_.keys(en[key]), (innerKey) => {
			translations[key][innerKey] = [
				en[key][innerKey],
				fr[key][innerKey]
			];
		});
	});
	return translations;
};

export const translations = mapTranslations();
```


##### usage inside component

The following code show you how to use the messages inside your container.

```JS
<Container>
				<Row>
					<h1 id="page-header">{translate('deviceGallery.pageTitle')}</h1>
				</Row>
				<br />
				<Form className="row">
					<Form.Group>
						<Form.Control
                        ...
                        ...
```