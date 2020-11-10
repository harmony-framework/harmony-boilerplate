import React from 'react';

const getComponentName = (Component: any) => Component.displayName || Component.name || 'UnknownComponent';

export const decorateWithContext = (Context: any) => (mapContextToProps: any) => (Component: any) => class extends React.PureComponent {
	// eslint-disable-next-line react/static-property-placement
	static displayName = `decorateWithContext(${getComponentName(Component)})`;

	render() {
		const { props } = this;

		return (
			<Context.Consumer>
				{(context: any) => (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<Component {...props} {...mapContextToProps(context, props)} />
				)}
			</Context.Consumer>
		);
	}
};
