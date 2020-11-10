import * as React from 'react';
import { baseConnect } from '@base/features/base-redux-react-connect';
import { Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import {
	Btn, Checkbox, InputText, RadioButton, Textarea,
} from 'common-components/controllers';

interface Props {
	translate: Function;
}

class StyleGuide extends React.Component<Props> {
	render() {
		const progressLength = 100 / (6 / 3);
		const progressLength2 = 100 / (3 / 1);
		return (
			<Container>
				<form>
					<br />
					<h1>h1</h1>
					<h2>h2</h2>
					<h3>h3</h3>
					<h4>h4</h4>
					<br />
					<hr />
					<span className="b1">B1 טקסט מודגש</span><br />
					<span className="b3">B3 טקסט קטן מודגש</span><br />
					<span className="b4">B4 טקסט קטן</span><br />
					<span className="b5">B5  לייבל קטן (כותרות טבלה)</span>

					<hr />
					<InputText label="לייבל טקסט mini" inputSize="mini" value="" />
					<InputText label="לייבל טקסט small" inputSize="small" value="" />
					<InputText label="לייבל טקסט large" inputSize="large" value="" placeholder="נא הכנס טקסט" />
					<InputText label="mandatory לייבל טקסט" value="" placeholder="נא הכנס טקסט" mandatory />
					<InputText label="value לייבל טקסט" className="" value="סימון לוריא" />
					<InputText
						label="disabled value לייבל טקסט"
						placeholder="נא הכנס טקסט"
						value="סימון לוריא"
						disabled
					/>
					<InputText
						label="mandatory with error"
						value=""
						errorText="נא הכנס טקסט"
						mandatory
					/>

					<hr />
					<Checkbox label="שדה 1" />
					<Checkbox label="שדה 2" />
					<Checkbox label="שדה 3" />
					<Checkbox label="שדה 4" />

					<br /><br />
					<RadioButton label="שדה 1" name="group1" />
					<RadioButton label="שדה 2" name="group1" />
					<RadioButton label="שדה 3" name="group1" />
					<RadioButton label="שדה 4" name="group1" />

					<hr />
					<RadioButton label="שדה 1" name="group2" />
					<RadioButton label="checkedשדה 2" name="group2" checked />
					<RadioButton label="שדה 3" name="group2" />
					<RadioButton label=" disabled שדה 4" name="group2" disabled />
					<hr />

					<Btn className="primary">
						פעולה עיקרית
					</Btn>

					<Btn className="important">
						פעולה חשובה
					</Btn>

					<Btn className="secondaryAction">
						פעולה משנית
					</Btn>
					<Btn className="destructive">
						פעולה הרסנית
					</Btn><br />
					<Btn className="primary" disabled>
						פעולה עיקרית
					</Btn>

					<Btn className="important" disabled>
						פעולה חשובה
					</Btn>

					<Btn className="secondaryAction" disabled>
						פעולה משנית
					</Btn>
					<Btn className="secondaryAction" disabled>
						פעולה הרסנית
					</Btn>
					<br />
					<hr />
					<Textarea placeholder="נא הכנס טקסט" />
					<br />
					<Textarea placeholder="נא הכנס טקסט" value="זהו טקסט כלשהו" label="לייבל לטקסט" />
					<br />
					<Textarea
						placeholder="נא הכנס טקסט"
						value="זהו טקסט כלשהו"
						label="לייבל לטקסט"
						mandatory
						errorText="שדה חובה"
					/>
					<hr />

					<ToggleButtonGroup type="radio" name="options" defaultValue={1}>
						<ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
						<ToggleButton value={2}>Radio 2</ToggleButton>
						<ToggleButton value={3}> 3</ToggleButton>
					</ToggleButtonGroup>
					<hr />
					<div className="wizzard">
						<ul>
							<li>סוג לקוח</li>
							<li>פרטי לקוח</li>
							<li>אמצעי תשלום</li>
							<li className="active">שלב נוכחי</li>
							<li className="">שלב הבא</li>
							<li className="">שלב סופי</li>
						</ul>
						<div className="progress">
							<div
								className="progress-bar"
								style={{ width: `${progressLength}%` }}
							/>
						</div>
					</div>
					<hr />
					<div className="wizzard">
						<ul>
							<li>סוג לקוח</li>
							<li className="active">שלב נוכחי</li>
							<li>שלב סופי</li>
						</ul>
						<div className="progress">
							<div
								className="progress-bar"
								style={{ width: `${progressLength2}%` }}
							/>
						</div>
					</div>
					<hr />
				</form>

			</Container>
		);
	}
}

export default baseConnect(
	StyleGuide,
	() => ({}),
	() => ({}),
);
