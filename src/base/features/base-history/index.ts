import { createBrowserHistory, createHashHistory } from 'history';

const historyObject = (window.cordova) ? createHashHistory() : createBrowserHistory();

export default historyObject;
