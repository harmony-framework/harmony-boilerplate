const flowManager = require('./services/flowmanager');

module.exports = (app, server, compiler) => {
	app.get('/flow-manager/add-flow', flowManager.addNewFlow);
};
