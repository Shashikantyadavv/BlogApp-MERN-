const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//In this we have controller for the below operation
//1. add a new blog
//2. delete a blog
//3. update a blog

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }
  if (!blogList) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date();
  const newBlog = new Blog({
    title,
    description,
    date: currentDate,
  });
  try {
    await newBlog.save();
  } catch (e) {
    console.log(e);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    await session.commitTransaction();
    return res.status(201).json({ message: "Blog Added Successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error Adding Blog" });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error Deleting Blog" });
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    });
    return res.status(200).json({ message: "Blog Updated Successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Error Updating Blog" });
  }
};

module.exports = {
  fetchListOfBlogs,
  addNewBlog,
  deleteBlog,
  updateBlog,
};
