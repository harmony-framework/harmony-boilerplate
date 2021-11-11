/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/iframe-has-title,jsx-a11y/iframe-has-title */
import * as React from 'react';
import { Dispatch } from 'redux';
import { baseConnect } from '@base/features/base-redux-react-connect';

export interface Props {
	responseAction: string; // The Action to dispatch with the response
	trustedOrigins: Array<string>; // Array of trusted origins to get the message
	allow?: string;
	allowFullScreen?: boolean;
	height?: number | string;
	marginWidth?: number;
	name?: string;
	sandbox?: string;
	seamless?: boolean;
	src: string;
	srcDoc?: string;
	width?: number | string;
	style?: any;
	className?: string;
}

export interface OwnProps extends Props {
	dispatchResponse: (responseAction: string, payload: any) => void;
}

export class IFrame extends React.Component<OwnProps> {
	constructor(props: OwnProps) {
		super(props);

		const { trustedOrigins, dispatchResponse, responseAction } = props;

		window.addEventListener('message', (event) => {
			if (trustedOrigins.includes(event.origin)) {
				dispatchResponse(responseAction, event.data);
			}
		}, false);
	}

	render() {
		const {
			allow,
			allowFullScreen,
			height,
			marginWidth,
			name,
			sandbox,
			seamless,
			src,
			srcDoc,
			width,
			children,
			style,
			className
		} = this.props;

		return (
			<iframe
				allow={allow}
				allowFullScreen={allowFullScreen}
				height={height}
				marginWidth={marginWidth}
				name={name}
				sandbox={sandbox}
				seamless={seamless}
				src={src}
				srcDoc={srcDoc}
				width={width}
				style={style}
				className={className}
			>
				{children}
			</iframe>
		);
	}
}

export default baseConnect<any, any, Props>(
	IFrame,
	() => {
		return {

		};
	},
	(dispatch: Dispatch) => ({
		dispatchResponse: (responseAction: string, payload: any) => dispatch({ type: responseAction, payload })
	})
);
