import * as React from 'react';
import { Helmet } from 'react-helmet';

export interface WithSEOConfig {
	helmet: (props: any) => any;
}

export const withSEO = (config: WithSEOConfig) => (Component: React.ComponentType): any => {
	return class extends React.Component {
		render() {
			return (
				<>
					<Helmet>‍
						{config.helmet(this.props)}
					</Helmet>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<Component {...this.props} />
				</>
			);
		}
	};
};
