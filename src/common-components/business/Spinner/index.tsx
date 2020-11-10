import * as React from 'react';
import './style.scss';

const spinner: React.FC = () => {
	return (
		<div className="globalSpinner">
			<img src="/assets/images/Spinner.svg" alt="globalSpinner" />
		</div>
	);
};

export default spinner;
