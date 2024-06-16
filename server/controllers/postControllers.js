const User = require("../models/userModel");
const Post = require("../models/postModel");
const HttpError = require("../models/errorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const upload=require('express-fileupload')
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

//   Create A Post
// post :api/posts
//UnProtected

const createPost = async (req, res, next) => {
  try {
    let { title, category, description, thumbnail } = req.body;
    console.log(title,category,description,thumbnail);
    if (!title || !category || !description || !thumbnail) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail.", 422)
      );
    }
    const newPost = await Post.create({
      title,
      category,
      description,
      thumbnail,
      creator: req.user.id,
    });
    if (!newPost) {
      return next(new HttpError("Post could not created", 422));
    }
    // find user and increase post count by one
    const currentUser = await User.findById(req.user.id);
    const userPostCount = currentUser.posts + 1;
    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
    res.status(201).json(newPost);
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Create Post");
};

//   Get  Posts
// GET :api/posts
//Protected

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Get all Posts");
};

//   Get A single post
// GET :api/posts/:id
//UnProtected

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found.", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Get single Post");
};

//   get posts by category
// GET :api/posts/categories/:category
//Protected

const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Get posts by category");
};

//   GET posts by authors
// GET :api/posts/users/:id
//UnProtected

const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Get users/author  Posts");
};

//   Edit posts
// PATCH :api/posts/:id
//Protected

const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    if (!req.files) {
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      //get old post form the database
      const oldPost = await Post.findById(postId);
      //delete old thumbnail from upload
      fs.unlink(
        path.join(__dirname, "..", "uploads", oldPost.thumbnail),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      //upload new thumbnail
      const { thumbnail } = req.files;
      //check file size
      if (thumbnail.size > 2000000) {
        return next(
          new HttpError("Thumbnail too big . Should be less than 2mb")
        );
      }
       fileName = thumbnail.name;
      let splittedFilename = fileName.split(".");
       newFilename =
        splittedFilename[0] +
        uuid() +'.'+
        splittedFilename[splittedFilename.length - 1];
      thumbnail.mv(
        path.join(__dirname, "..", "uploads", newFilename),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description, thumbnail: newFilename },
        { new: true }
      );
    }
    if(!updatedPost){
      return next(new HttpError("Could not update post",400))
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    return next(new HttpError(error));
  }
  // res.json("Edit Post");
};

//   Delete post
// DELETE :api/posts
//Protected

const deletePost = async (req, res, next) => {
  try{
const postId=req.params.id;
if(!postId){
  return next(new HttpError("Post anavailable",400));
}
const post=await Post.findById(postId)
const fileName = post?.thumbnail;
if(req.user.id == post.creator){

//delete thumbnail from uploads folder
fs.unlink(path.join(__dirname,'..','uploads',fileName),async(err)=>{
  if(err){
  return next(new HttpError(err))
  }else{
    await Post.findByIdAndDelete(postId)
    // after delete find user and decrease the post count bt one
    const currentUser=await User.findById(req.user.id);
    const userPostCount=currentUser.posts - 1;
    await User.findByIdAndUpdate(req.user.id,{posts:userPostCount})
    res.json(`Post ${postId} deleted successfully`)
  }
  
})
  }else{
    return next(new HttpError("post coult not deleted",403))
  }
  }catch(error){
    return next(new HttpError(error));
  }
  // res.json("delete Post");
};


module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
