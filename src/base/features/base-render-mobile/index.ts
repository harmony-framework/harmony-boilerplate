import { createMedia } from '@artsy/fresnel';

export const { Media, MediaContextProvider } = createMedia({
	breakpoints: {
		sm: 0,
		md: 768,
		lg: 1024,
		xl: 1192
	},
});
