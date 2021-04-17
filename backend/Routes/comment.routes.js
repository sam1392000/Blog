const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  addComment,
  getAllCommentforTheBlog,
  getComments,
} = require("../Controllers/Comment.controller");

// post route
router.post(
  "/addcomment",
  [
    check("blogid", "Something Went Wrong").isLength({ min: 3 }),
    check("userid", "Login to Comment").isLength({ min: 3 }),
  ],
  addComment
);

// get route
router.param("blogId", getAllCommentforTheBlog);
router.get("/getComment/:blogId", getComments);
module.exports = router;
