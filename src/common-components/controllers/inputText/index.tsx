import * as React from 'react';
import './styles.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
	className?: string;
	label: string;
	errorText?: string;
	inputSize?: 'mini' | 'small' | 'large';
	mandatory?: boolean;
}

const InputText: React.FC<Props> = (props: Props) => {
	const {
		className = '', label, errorText, inputSize = 'large', mandatory
	} = props;
	const mandatoryClass = mandatory ? ' mandatory' : '';
	const errorClass = errorText ? ' error' : '';

	return (
		<div className={`inputTextWrapper ${inputSize} ${className}${mandatoryClass}${errorClass}`}>
			<label> {label}</label>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<input type="text" required={mandatory} {...props} />
			{errorText && (<span>errorText</span>)}
		</div>
	);
};

export default InputText;

