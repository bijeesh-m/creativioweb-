const Category = require('../models/Category');

// @desc    Get all categories (public)
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true }).sort({
            order: 1,
            name: 1,
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all categories (admin)
// @route   GET /api/admin/categories
// @access  Private
const getCategoriesAdmin = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ order: 1, name: 1 });
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Private
const createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private
const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategoriesAdmin,
    createCategory,
    updateCategory,
    deleteCategory,
};
