//管理中心课程管理
var course = require('../../controllers/admin/course'),
	course_router = require('express').Router();
//课程展示页面
course_router.get('/admin/course/show', course.show);
//课程新增页面
course_router.get('/admin/course/new', course.new);
exports.course = course_router;