export const required = (value: any) => (value || typeof value === 'number' ? undefined : 'Required');

export const maxLength = (value: any) => (value && value.length > 15 ? `Must be ${15} characters or less` : undefined);

export const email = (value: any) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
	? 'Invalid email address'
	: undefined
);

export const alphaNumeric = (value: any) => (value && /[^a-zA-Z0-9 ]/i.test(value)
	? 'Only alphanumeric characters'
	: undefined
);
