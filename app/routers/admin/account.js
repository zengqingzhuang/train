//管理中心账号管理
var account = require('../../controllers/admin/account'),
	account_router = require('express').Router();
//公司账号管理页面
account_router.get('/admin/company/show', account.companyshow);
//公司账号新增页面
account_router.get('/admin/company/new', account.companynew);
//用户账号管理页面
account_router.get('/admin/user/show', account.usershow);
//用户账号新增页面
account_router.get('/admin/user/new', account.usernew);
exports.account = account_router;