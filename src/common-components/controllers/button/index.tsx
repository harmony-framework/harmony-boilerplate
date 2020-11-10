import * as React from 'react';
import './styles.scss';
import { Button, ButtonProps } from 'react-bootstrap';

interface Props extends ButtonProps {
	className?: string;
	children: any;
	onClick?(e: React.MouseEvent): void;
}

const Btn: React.FC<Props> = ({
	className = 'primary', children, onClick, ...rest
}: Props) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Button className={className} onClick={onClick} {...rest}>
			{children}
		</Button>
	);
};

export default Btn;

