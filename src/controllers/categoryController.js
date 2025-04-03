import expressAsyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
})

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = expressAsyncHandler(async (req, res) => {
  const { name, image, subcategories } = req.body

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  }

  const category = new Category({
    name,
    image,
    subcategories,
  })

  const createdCategory = await category.save()
  res.status(201).json(createdCategory)
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = expressAsyncHandler(async (req, res) => {
  const { name, image, subcategories } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name || category.name
    category.image = image || category.image
    category.subcategories = subcategories || category.subcategories

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.deleteOne()
    res.json({ message: "Category removed" })
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }

