const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const adminUrl = '/admin';
const customMiddleware = require('../middleware');
const HomeController = require('../controller/front/HomeController');
const AboutController = require('../controller/front/AboutController');
const AdminController = require('../controller/admin/AdminController');
const CategoryController = require('../controller/admin/CategoryController');
const PostController = require('../controller/admin/PostController');

// front
router.get('/', HomeController.index);
router.get('/about', AboutController.index);

// dashboard
router.get('/admin/login', AdminController.login);
router.post('/admin/login', AdminController.check_user);
router.get('/admin/logout', customMiddleware.checkAuth(adminUrl),AdminController.logout);
router.get('/admin', customMiddleware.checkAuth(adminUrl), AdminController.index);
// category
router.get('/admin/category', CategoryController.index);
router.post('/admin/category', upload.none(), CategoryController.create);
router.delete('/admin/category/:id',CategoryController.remove);
router.get('/admin/category/:id', CategoryController.get);
router.get('/admin/all-category',CategoryController.list);
router.put('/admin/category', upload.none(),CategoryController.update);

// post
router.get('/admin/add-post', customMiddleware.checkAuth(adminUrl), PostController.index);
router.get('/admin/all-posts', customMiddleware.checkAuth(adminUrl), PostController.list);
router.post('/admin/post',upload.single('image'), customMiddleware.checkAuth(adminUrl), PostController.save);

module.exports = router;


