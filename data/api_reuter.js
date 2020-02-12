const express = require("express");
const Posts = require("./db");

const router = express.Router();

// get all
router.get("/", (req, res) => {
  Posts.find(req.query).then(post => {res.status(200).json(post)})
    .catch(err => {res.status(500).json({errorMessage: "The posts information could not be retrieved"})})
});


// get Posts posts by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = Posts.findById(id);
  post ?
    post.then(post => {res.status(200).json(post)})
      .catch(err => {res.status(500).json({ errorMessage: "There was an error retrieving Posts post" })})
  : res.status(404).json({ errorMessage: "The post with the given id does not exist" })
});

// get comments by id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  const post = Posts.findById(id);

  post ?
    Posts.findPostComments(id).then(comments => {res.status(200).json(comments)})
      .catch(err => {res.status(500).json({ errorMessage: "There was an error retrieving comments" })})
  : res.status(404).json({ errorMessage: "The post with the given id does not exist" });
});

// add new Posts post
router.post("/", (req, res) => {
    const userInfo = req.body;
    
    userInfo['title'] && userInfo['contents'] ?
    Posts.insert(userInfo).then(post => {res.status(200).json(userInfo);})
        .catch(err => {res.status(500).json({errorMessage:"There was an error while saving the post to the database"})})
    :   res.status(404).json({ errorMessage: 'provide name and bio.' })
});


router.post("/:id/comments", (req, res) => {
  
  
    req.body.text ?
      Posts.insertComment(req.body.text).then(comment => {res.status(201).json(req.body);})
        .catch(err => {res.status(500).json({errorMessage: "There was a problem submitting your comment."})})
        : res.status(500).json({ errorMessage: "Please provide text for your comment" }); 
});

// edit Posts post
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = Posts.findById(id);
  const newPost = req.body;

    post ?
      Posts.update(id, newPost).then(post => {res.status(201).json(newPost)})
        .catch(err => {res.status(500).json({ errorMessage: "there was a problem updating the post" })})
    :
      res.status(404).json({ errorMessage: "The post with the given id does not exist" });
});

// delete Posts post
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  id ?
    Posts.remove(id).then((deleted) => {res.status(200).json({ message: `Post with id ${id} was deleted.`})})
      .catch(err => {res.status(500).json({ errorMessage: "The post could not be deleted." })})
    : res.status(404).json({ errorMessage: "The post with the given id does not exist" })
});

module.exports = router;