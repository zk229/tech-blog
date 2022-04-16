const router = require("express").Router();
const { Comment } = require("../../models");


router.get("/",  async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll();
    res.status(200).json(dbCommentData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);
    if(!dbCommentData) {
      res.status(404).json({ message: "No comment with that id found!" });
      return;
    }
    res.status(200).json(dbCommentData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.post("/", async (req, res) => {
  const myId = req.session.user || req.body.id;
  //console.log(myId);
  try {
    const dbCommentData = await Comment.create({
      user_id: myId,
      post_id: req.body.post_id,
      date: req.body.date,
      content: req.body.content
    });
    res.status(200).json(dbCommentData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if(!commentData) {
      res.status(404).json({ message: "No comment with that id found!" });
      return;
    }
    commentData.set({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      date: req.body.date,
      content: req.body.content
    });
    await commentData.save();
    res.status(200).json(commentData);
  }
  catch (err) {
    res.status(500).json(err);    
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id 
      }
    });
    
    if(!commentData) {
      res.status(404).json({ message: "No comment with that id found!" }); 
      return;
    }
    res.status(200).json(commentData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

module.exports = router;