import * as React from 'react';
import './styles.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
	className?: string;
	disabled?: boolean;
	label: string;
}

const Checkbox: React.FC<Props> = (props: Props) => {
	const { disabled, label, className = '' } = props;
	const disabledClass = disabled ? ' disabled' : '';
	return (
		<label className={`checkboxWrapper${disabledClass} ${className}`}>
			{label}
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<input type="checkbox" {...props} />
			<span className="checkmark" />
		</label>
	);
};

export default Checkbox;

