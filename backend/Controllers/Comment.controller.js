const comment = require("../Modal/Comment");
const { validationResult } = require("express-validator");
exports.addComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(402).json({
      error: errors.array()[0].msg,
    });
  const blogid = req.body.blogid;
  const userid = req.body.userid;
  const like = req.body.like;
  const comment1 = req.body.comment;
  const newComment = new comment({
    blogid: blogid,
    userid: userid,
    like: like,
    comment: comment1,
  });
  newComment.save((err, comment) => {
    if (err)
      return res.status(402).json({
        error: "Cannot post your comment..please try again later",
      });
    return res.status(200).json({
      comment: comment,
    });
  });
};

exports.getAllCommentforTheBlog = (req, res, next, id) => {
  comment.find({ blogid: id }).exec((err, comments) => {
    if (err)
      return res.status(400).json({
        error: "Cant get comment for this  blog",
      });
    req.comments = comments;
    next();
  });
};

exports.getComments = (req, res) => {
  return res.json(req.comments);
};
