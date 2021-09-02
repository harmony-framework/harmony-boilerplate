import { createBrowserHistory, createHashHistory } from 'history';

const historyObject = cordova ? createHashHistory() : createBrowserHistory();

export default historyObject;
