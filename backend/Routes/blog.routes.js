const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  getSingleBlog,
  addNewBlog,
} = require("../Controllers/blog.controller");

// get Route
router.param("blogid", getBlogById);

router.get("/find/:blogid", getSingleBlog);

router.get("/allBlogs", getAllBlogs);

// post Route
router.post(
  "/addBlog",
  [
    check("owner", "Should LogIn to post a Blog").isLength({ min: 2 }),
    check("title", "Title Must alteast 2 Character").isLength({ min: 2 }),
    check("content", "Empty Blog cant be post").isLength({ min: 1 }),
  ],
  addNewBlog
);
module.exports = router;
