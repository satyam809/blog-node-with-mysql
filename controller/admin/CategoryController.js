const { check, validationResult } = require('express-validator');
const categoryModel = require('../../model/CategoriesModel');

async function index(req, res) {
  res.render('admin/category');
}
exports.index = index;

async function create(req, res) {
  const validationRules = [
    check('name').notEmpty().withMessage('Name is required'),
  ];

  // Apply validation middleware
  await Promise.all(validationRules.map(validation => validation.run(req)));

  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  }

  // Validation successful, proceed with creating category
  const result = await categoryModel.insert(req.body);
  if (result.affectedRows == 1) {
    return res.send({ 'status': true, 'message': 'Data added successfully' });
  }
}

exports.create = create;


async function list(req, res) {
  const data = await categoryModel.getAll(req.body);
  res.send({ data: data });
}
exports.list = list;
async function remove(req, res) {
  const result = await categoryModel.remove(req.params.id);
  if (result.affectedRows == 1) {
    res.send({ 'status': true, 'message': 'Category deleted successfully' });
  }
}
exports.remove = remove;
async function get(req, res) {
  const result = await categoryModel.get(req.params.id);
  res.send({ 'result': result[0] });
}
exports.get = get;

async function update(req, res) {
  const data = await categoryModel.update(req.body);
  if (data.affectedRows == 1) {
    res.send({ 'status': true, 'message': 'Category updated successfully' });
  }
}
exports.update = update

