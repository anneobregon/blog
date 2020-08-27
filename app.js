require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/postDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date
});

const Post = mongoose.model("Post", postSchema);

let postId = "";

app.get("/posts", (req,res) => {
    Post.find({}, (err, foundPosts) => {
        if(!err) {
            res.send(foundPosts);
        } else {
            console.log("POSTTTS "+err);
        }
    });
});

app.get("/post/:id", (req,res) => {
    const postId = req.params.id;

    Post.findOne({_id: postId}, (err, foundPost) => {
        if(!err) {
            res.send(foundPost);
        } else {
            console.log("POSTTTT ID "+err);
        }
    });
})

app.post("/compose", (req,res) => {
    const postTitle = req.body.title;
    const postContent = req.body.post;
    const postDate = new Date().toLocaleDateString();

    const newPost = new Post({
        title: postTitle,
        content: postContent,
        date: postDate
    });

    newPost.save();

    res.redirect("/posts");
});

app.post("/update/:id", (req,res) => {
    Post.updateOne({_id: req.params.id}, {title: req.body.title, content: req.body.content}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully updated the document");
        }
    } )
})

app.post("/post/:id", (req,res) => {
    postId = req.body.id;

    res.redirect("/post"+postId);

})

app.post("/delete", (req,res) => {
    Post.deleteOne({_id: req.body.id}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("SUCCESSFULLY deleted the post")
        }
    })
})


let port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Server is running on port "+port);
});