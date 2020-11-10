import * as React from 'react';
import './styles.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
	className?: string;
	disabled?: boolean;
	label: string;
}

const RadioButton: React.FC<Props> = (props: Props) => {
	const { className = '', disabled, label } = props;
	const disabledClass = disabled ? ' disabled' : '';

	return (
		<label className={`radioBtnWrapper${disabledClass} ${className}`}>
			{label}
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<input type="radio" disabled={disabled} {...props} />
			<span className="checkmark" />
		</label>

	);
};

export default RadioButton;

