//管理中心分类管理
var classify = require('../../controllers/admin/classify'),
	classify_router = require('express').Router();
//分类新增页面
classify_router.get('/admin/classify/new', classify.new);
//一级分类页面
classify_router.get('/admin/classify/one', classify.one);
//二级分类页面
classify_router.get('/admin/classify/two', classify.two);
//三级分类页面
classify_router.get('/admin/classify/three', classify.three);
exports.classify = classify_router;