var course = require('../controllers/course'),
	course_router = require('express').Router();
//课程搜索页面
course_router.get('/course/search', course.search);
//课程详情页面
course_router.get('/course/detail', course.detail);
exports.course = course_router;