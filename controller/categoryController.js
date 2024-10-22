import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// Create a new category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }

        const existCategory = await categoryModel.findOne({ name });
        if (existCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();

        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        });
    }
};

// Update an existing category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(
            id, 
            { name, slug: slugify(name) }, 
            { new: true } // returns the updated document
        );

        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get all categories
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

// Get single category
export const SingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Get Single Category Successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While getting Single Category',
        });
    }
};

// Delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting category',
            error,
        });
    }
};
