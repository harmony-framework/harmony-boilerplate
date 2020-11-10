import * as React from 'react';
import './style.scss';

interface Props {
	children: any;
	width?: string;
	height?: string;
	flex?: number;
}

const SectionContainer: React.FC<Props> = (props: Props) => {
	const {
		children,
		height = 'auto',
		width = '100%',
		flex = 1
	} = props;
	return (
		<div style={{ height, width, flex }} className="section-container">
			{children}
		</div>
	);
};

export default SectionContainer;
