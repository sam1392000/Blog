const blog = require("../Modal/blog.Schema");
const { validationResult } = require("express-validator");

exports.getBlogById = (req, res, next, id) => {
  blog.findById(id).exec((err, blog) => {
    if (err)
      return res.status(400).json({
        error: "NO Blog post at this id",
      });
    req.blog = blog;
    next();
  });
};

exports.getAllBlogs = (req, res) => {
  blog.find({}).exec((err, blog) => {
    if (err)
      return res.status(400).json({
        error: "NO Blog post",
      });
    return res.status(200).json({
      blog: blog,
    });
  });
};

exports.getSingleBlog = (req, res) => {
  return res.json(req.blog);
};

exports.addNewBlog = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  const owner = req.body.owner;
  const title = req.body.title;
  const content = req.body.content;
  const newBlog = new blog({
    owner: owner,
    title: title,
    content: content,
  });

  newBlog.save((err, blog) => {
    if (err)
      return res.status(400).json({
        error: "Blog Cant be Saved Try later",
      });
    return res.status(200).json({
      blog: blog,
    });
  });
};
