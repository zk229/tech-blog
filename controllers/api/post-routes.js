const router = require("express").Router();
const { Post } = require("../../models");


router.get("/",  async (req, res) => {
  try {
    const dbPostData = await Post.findAll();
    res.status(200).json(dbPostData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);
    if(!dbPostData) {
      res.status(404).json({ message: "No post with that id found!" });
      return;
    }
    res.status(200).json(dbPostData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.post("/", async (req, res) => {
  const myId = req.session.user || req.body.id;
  //console.log(myId);
  try {
    const dbPostData = await Post.create({
      user_id: myId,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content
    });
    res.status(200).json(dbPostData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if(!postData) {
      res.status(404).json({ message: "No post with that id found!" });
      return;
    }
    postData.set({
      user_id: req.body.user_id,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content
    });
    await postData.save();
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);    
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id 
      }
    });
    
    if(!postData) {
      res.status(404).json({ message: "No post with that id found!" }); 
      return;
    }
    res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

module.exports = router;