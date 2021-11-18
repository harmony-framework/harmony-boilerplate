const gulp = require('gulp');
const template = require('gulp-template');
const header = require('gulp-header');
const footer = require('gulp-footer');
const rename = require("gulp-rename");
const inject = require('gulp-inject-string');
const replace = require('gulp-replace');
const sass    = require('gulp-sass');

const CLIENT_PATH = './';
const CLIENT_DIST_PATH = './dist';


/** ------------------- CLIENT ----------------------------- **/

gulp.task('createContainer', (done) => {
	let className = capitalizeFirstLate(getArg('className'));
	let classNameLowerCase = lowerCaseFirstLater(className);

	if (!validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/container-template',
		`${process.env.INIT_CWD}/${className}/index.tsx`,
		{
			className,
			classNameLowerCase
		}
	);
	done();
});

gulp.task('createFormContainer', (done) => {
	let className = capitalizeFirstLate(getArg('className'));
	let classNameLowerCase = lowerCaseFirstLater(className);

	if (!validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/form-container-template',
		`${process.env.INIT_CWD}/${className}/index.tsx`,
		{
			className,
			classNameLowerCase
		}
	);
	done();
});


gulp.task('createComponent', (done) => {
	let componentName = lowerCaseFirstLater(getArg('name'));
	let storyTitle = getArg('storyTitle');
	let nameUppercase = capitalizeFirstLate(componentName);

	if (!validateName(componentName, '--name') || !validateName(storyTitle, '--storyTitle')) return;

	createTemplate(
		'./generator/templates/client/component-template',
		`${process.env.INIT_CWD}/${nameUppercase}/index.tsx`,
		{ name: componentName }
	);

	createTemplate(
		'./generator/templates/client/story',
		`${process.env.INIT_CWD}/${nameUppercase}/${nameUppercase}.stories.tsx`,
		{
			name: componentName,
			nameUppercase,
			storyTitle
		}
	);
	done();
});


gulp.task('createStoryContainer', (done) => {
	let componentName = lowerCaseFirstLater(getArg('name'));
	let storyTitle = getArg('storyTitle');
	let nameUppercase = capitalizeFirstLate(componentName);

	if (!validateName(componentName, '--name') || !validateName(componentName, '--storyTitle')) return;

	createTemplate(
		'./generator/templates/client/story-container',
		`${process.env.INIT_CWD}/${nameUppercase}.stories.tsx`,
		{
			name: componentName,
			nameUppercase,
			storyTitle
		}
	);
	done();
});

gulp.task('createStory', (done) => {
	let componentName = lowerCaseFirstLater(getArg('name'));
	let storyTitle = getArg('storyTitle');
	let nameUppercase = capitalizeFirstLate(componentName);

	if (!validateName(componentName, '--name') || !validateName(componentName, '--storyTitle')) return;

	createTemplate(
		'./generator/templates/client/story',
		`${process.env.INIT_CWD}/${nameUppercase}.stories.tsx`,
		{
			name: componentName,
			nameUppercase,
			storyTitle
		}
	);
	done();
});


gulp.task('createAction', (done) => {
	let actionName = lowerCaseFirstLater(getArg('name'));

	if (!validateName(actionName, '--name', false)) return;

	// create redux template
	createTemplate(
		'./generator/templates/client/redux-template',
		`${process.env.INIT_CWD}/${actionName}/redux.ts`,
		{
			actionName,
			actionNameUppercase: capitalizeFirstLate(actionName)
		}
	);

	// create saga template
	createTemplate(
		'./generator/templates/client/saga-template',
		`${process.env.INIT_CWD}/${actionName}/sagas.ts`,
		{
			actionName,
			actionNameUppercase: capitalizeFirstLate(actionName)
		}
	);

	// create action index
	createTemplate(
		'./generator/templates/client/action-index',
		`${process.env.INIT_CWD}/${actionName}/index.ts`,
		{
			actionName,
			actionNameUppercase: capitalizeFirstLate(actionName)
		}
	);

	// create manager
	createTemplate(
		'./generator/templates/client/manager',
		`${process.env.INIT_CWD}/${actionName}/manager.ts`,
		{
			actionName,
			actionNameUppercase: capitalizeFirstLate(actionName)
		}
	);

	// create interface
	createTemplate(
		'./generator/templates/client/interfaces-template',
		`${process.env.INIT_CWD}/${actionName}/interface.ts`,
		{
			actionName,
			actionNameUppercase: capitalizeFirstLate(actionName)
		}
	);
	done();
});

gulp.task('createSaga', (done) => {
	let sagaName = lowerCaseFirstLater(getArg('name'));

	if (!validateName(sagaName, '--name', false)) return;

	createTemplate(
		'./generator/templates/client/saga-template',
		`${process.env.INIT_CWD}/${sagaName}/index.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);

	createTemplate(
		'./generator/templates/client/saga-index',
		`${process.env.INIT_CWD}/${sagaName}/sagas.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);

	createTemplate(
		'./generator/templates/client/saga-manager',
		`${process.env.INIT_CWD}/${sagaName}/manager.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);
	done();
});

gulp.task('createRedux', (done) => {
	let reducerName = lowerCaseFirstLater(getArg('name'));
	let reducerNameCapital = capitalizeFirstLate(getArg('name'));

	if (!validateName(reducerName, '--name', false)) return;

	createTemplate(
		'./generator/templates/client/redux-template',
		`${process.env.INIT_CWD}/${reducerName}/index.ts`,
		{
			reducerName,
			reducerNameCapital
		}
	);

	createTemplate(
		'./generator/templates/client/redux-interfaces-template',
		`${process.env.INIT_CWD}/${reducerName}/interfaces.ts`,
		{
			reducerName,
			reducerNameCapital
		}
	);
	done();
});


/*** HELPERS ***/

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function replaceText(src, dest, needle, text) {
	gulp.src(src)
		.pipe(replace(needle, text))
		.pipe(gulp.dest(dest));
}

function injectAfter(src, dest, injectAfter, injectValue) {
	return gulp.src(src)
		.pipe(inject.after(injectAfter, injectValue))
		.pipe(gulp.dest(dest));
}

function injectAppend(src, dest, inject) {
	return gulp.src(src)
		.pipe(header(inject))
		.pipe(gulp.dest(dest));
}

function createTemplate(src, dest, templateParams) {
	return gulp.src(src)
		.pipe(rename(dest))
		.pipe(template(templateParams))
		.pipe(gulp.dest("./"));
}

function addFooter(src, dest, footerTemplate, footerParams) {
	return gulp.src(src)
		.pipe(footer(footerTemplate, footerParams))
		.pipe(gulp.dest(dest));
}

function validateName(componentName, expectedParam, checkFirstIsUppercase) {
	if (!componentName) {
		console.error("ERR! You are not select mandatory parameter value " + expectedParam);
		return false;
	}

	if (componentName[0] !== componentName[0].toUpperCase() && checkFirstIsUppercase) {
		console.error("ERR!" + expectedParam + " value must start with uppercase");
		return false;
	}

	return true;
}


function getArg(name) {

	let i = process.argv.indexOf('--' + name);
	if (i > -1) {
		return process.argv[i + 1];
	}

	return null;

}


const capitalizeFirstLate = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
};

const lowerCaseFirstLater = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toLowerCase() + s.slice(1)
};
