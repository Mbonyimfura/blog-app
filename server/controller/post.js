const PostModel = require('../models/PostModel');

const createPost = async (req, res) => {
  try {
    const { title, description,email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = '/Public/Images/' + file.filename;
   
    const post = await PostModel.create({
      title,
      description,
      file: filePath,
      email
    });
    console.log(post)
    res.status(201).json('Success!');
  } catch (error) {
    res.status(500).json(error);
  }
};
const getPosts=async(req,res)=>{
    try {
        const posts=await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
       res.status(500).json(err) 
    }
}

const getPost=async(req,res)=>{
  const id=req.params.id;
  try {
    const post=await PostModel.findById({_id:id});
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}
const editPost = async (req, res) => {
const id=req.params.id

try {
  const updatePost=await PostModel.findByIdAndUpdate(id,
 { title:req.body.title,
description:req.body.description},{new:true})
if(!updatePost){
  return res.status(404).json({error:'Post not found!'})
}
res.status(200).json('Success!')
} catch (error) {
  res.status(500).json(error)
}}
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json('Success!');
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  createPost,getPosts,getPost,editPost,deletePost
};
