var _ = require('lodash');
module.exports = _.merge(
	require(__dirname + '/db'),
	require(__dirname + '/development')
);