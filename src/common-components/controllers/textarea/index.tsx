import * as React from 'react';
import './styles.scss';

interface Props extends React.HTMLProps<HTMLAreaElement> {
	className?: string;
	label?: string;
	errorText?: string;
	mandatory?: boolean;
	value?: string;
	placeholder?: string;
}

const Textarea: React.FC<Props> = (props: Props) => {
	const {
		className = '', label, errorText, mandatory, value, placeholder
	} = props;
	const mandatoryClass = mandatory ? ' mandatory' : '';
	const errorClass = errorText ? ' error' : '';
	return (
		<div className={`textareaWrapper${mandatoryClass}${errorClass} ${className}`}>
			<label> {label}</label>
			<textarea placeholder={placeholder}>
				{value}
			</textarea>
			{errorText && (<span>errorText</span>)}
		</div>
	);
};

export default Textarea;

