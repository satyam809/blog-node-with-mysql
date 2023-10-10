const { check, validationResult } = require('express-validator');
const postModel = require('../../model/PostModel');
async function index(req, res) {
    res.render('admin/post/index');
}
exports.index = index;
async function list(req, res) {
    res.render('admin/post/list');
}
exports.list = list;
async function save(req, res) {
    console.log(req.body);
    const validationRules = [
        check('category').notEmpty().withMessage('Category is required'),
        check('title').notEmpty().withMessage('Title is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('image').notEmpty().withMessage('Image is required'),
      ];
    
      // Apply validation middleware
      await Promise.all(validationRules.map(validation => validation.run(req)));
    
      // Check validation results
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
      }
    
      // Validation successful, proceed with creating category
      const result = await postModel.insert(req.body);
      if (result.affectedRows == 1) {
        return res.send({ 'status': true, 'message': 'Data added successfully' });
      }
}
exports.save = save;

