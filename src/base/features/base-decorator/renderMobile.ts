import { isMobile } from 'react-device-detect';

const RenderMobile = (/* config */) => (WrappedComponent: any) => {
	if (WrappedComponent.prototype.renderMobile && isMobile) {
		// eslint-disable-next-line no-param-reassign
		WrappedComponent.prototype.render = WrappedComponent.prototype.renderMobile;
	}

	return WrappedComponent;
};

export default RenderMobile;
