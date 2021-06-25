import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';

export interface Props {
	languages: any;
	setActiveLanguage: (languageCode: string) => void;
}

export const Localization: React.FC<Props> = (props: Props) => {
	const { languages, setActiveLanguage } = props;

	return (
		<div className="locale" style={{ width: '100%', padding: '10px', textAlign: 'center' }}>
			Language:
			<select
				onChange={(event: any) => {
					setActiveLanguage(event.target.value);
				}}
			>
				{languages.map((lang: any) => (
					<option key={lang.code} value={lang.code}>
						{lang.code}
					</option>
				))}
			</select>
		</div>
	);
};

export default baseConnect(
	Localization,
	(/* state */) => ({}),
	{}
);
