import mongoose from "mongoose";
import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};

export const getSubCategories = async (req, res) => {
  const {id}=req.params
  try {
    const categories = await Category.findById(id);
    res.status(200).json(categories);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};


export const createCategory = async (req, res) => {
  const newCategory = new Category({
    ...req.body,
  });

  try {
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("not id available");
  if (req?.userId != req.body?.creator?.userId) {
    return res.status(403).send({ message: "access denied" });
  }
  const categoryUpdated = await Category.findByIdAndUpdate(id, req.body, { new: true });
  res.json(categoryUpdated);
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("not id available");
    const category = await Category.findById(id);
    // console.log(req.userId)
    // console.log( Category?.creator?.userId)

    if (req?.userId != category?.creator?.userId) {
      return res.status(403).send({ message: "access denied" });
    }
    const categoryDeleted = await Category.findByIdAndDelete(id);
    res.json(categoryDeleted);
  } catch (err) {
    console.log(err);
  }
};

