/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';

declare function Compare(filterValue: any, props: any): boolean;

export interface Config {
	filterSelector: (state: any, props: any) => any;
	compare: typeof Compare;
}

interface Props {
	filterValue: any;
}

export default (config: Config): any => (WrappedComponent: any) => {
	class WithFilter extends React.Component<Props> {
		render() {
			const { filterValue } = this.props;

			const isDisplay = config.compare(filterValue, this.props);

			if (filterValue && !isDisplay) return null;

			return <WrappedComponent {...this.props} />;
		}
	}

	return baseConnect<any, any, any>(
		WithFilter,
		(state: any, props: any) => {
			return {
				filterValue: config.filterSelector(state, props)
			};
		},
		() => ({})
	);
};
