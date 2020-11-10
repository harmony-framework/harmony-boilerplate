import RoutesPath from 'routes/RoutesPath';

export const Apps = {
	StyleGuideApp: {
		id: 'StyleGuideApp',
		title: 'Style Guide'
	},
	DemoApp: {
		id: 'DemoApp',
		title: 'Demo Page'
	}
};

export const SubApps = {
	StyleGuide: {
		id: 'StyleGuideSub',
		title: 'Style Guide',
		location: {
			pathname: RoutesPath.STYLE_GUIDE
		}
	},
	DemoPage: {
		id: 'DemoPage',
		title: 'Demo Page',
		location: {
			pathname: RoutesPath.ROOT
		}
	}
};
