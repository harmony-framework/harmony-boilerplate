export const addCharactersBetweenString = (str: string, index: number, value: string) => {
	if (str) {
		return `${str.substring(0, index)} ${value} ${str.substring(index, index + str.length)}`;
	}
	return null;
};

export const isUndefinedAndNull = (value: any): boolean => value !== '' && value !== undefined && value !== null;

export function isPathDefined(obj: any, path: string): boolean {
	const args = Array.prototype.slice.call(arguments, 1);

	for (let i = 0; i < args.length; i++) {
		if (!obj || !obj.hasOwnProperty(args[i])) {
			return false;
		}

		obj = obj[args[i]];
	}

	return true;
}

/**
 * This function is checking if param is undefined or null
 * @param param
 */
export const isUndefinedOrNull = (param: any): boolean => param === undefined || param === null;

/**
 * This function is checking if param is empty string
 * @param param
 */
export const isEmptyString = (param: string): boolean =>  param === '';
export function isStringEmpty(str: string) {
	return str ? str.trim().length == 0 : true;
}

// This function is checking if Object is empty
const isEmpty = (value: any): boolean => Object.keys(value).length === 0 || value === 'undefined' || null || value.length === 0;

// This function is checking if Array is NOT empty
export function isArrayAndIsNotEmpty(arr: any){
	return Array.isArray(arr)&& !isEmpty(arr)
}

/**
 * This function return formatted date
 * @param date
 * @expect-result yyyy-mm-dd
 */
export function formatDateToHuman(date: any) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}
