//管理中心讲师管理
var lecturer = require('../../controllers/admin/lecturer'),
	lecturer_router = require('express').Router();
//讲师展示页面
lecturer_router.get('/admin/lecturer/show', lecturer.show);
//讲师新增页面
lecturer_router.get('/admin/lecturer/new', lecturer.new);
exports.lecturer = lecturer_router;