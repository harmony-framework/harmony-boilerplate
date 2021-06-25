import * as React from 'react';
import { LocalizeContextProps } from 'react-localize-redux';
import { baseConnect } from '@base/features/base-redux-react-connect';

export type Props = {

};

interface OwnProps extends Props, LocalizeContextProps {

}

export class ErrorPage extends React.Component<OwnProps> {
	render() {
		return (
			<div>
				Design Your Error Page Here
			</div>
		);
	}
}

export default baseConnect<any, any, Props>(
	ErrorPage,
	() => {
		return {

		};
	},
	{

	}
);
