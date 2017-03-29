var errFun = function(err) {
	var errJson = {
		status: 500,
		message: err.message,
		code: err.code
	}
	if (err && (err.code == 'ER_NO_SUCH_TABLE' || err.code == 'ER_BAD_FIELD_ERROR')) {
		errJson.status = 404;
	}
	return errJson;
};
module.exports = errFun;