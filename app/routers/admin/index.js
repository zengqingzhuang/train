var admin = require('../../controllers/admin/index'),
	admin_router = require('express').Router();
//登录页面
admin_router.get('/admin/login', admin.loginIndex);
//管理中心首页
admin_router.get('/admin', admin.index);
exports.admin = admin_router;