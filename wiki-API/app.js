const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs =   require("ejs");

const app = express()
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false})

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req,res){
    Article.find(function(err, foundArticles) {
        if(!err){
            res.send(foundArticles)
        } else {
            res.send(err);
        }
        
    })
})
.post(function(req,res) {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    article.save((err) => {
        if(!err){
            res.send("Successfully added the article");
        } else {
            res.send(err);
        }
    });
})
.delete((req,res) => {
    Article.deleteMany(function(err){
        if(err){
            res.send(err);
        }
        else {
            res.send("Successfully deleted");
        }
    })
});



app.route("/articles/:articleTitle")
.get((req,res)=>{
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        } else {
            res.send("404 Article not found");
        }
    })
})
.put((req,res)=>{
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        (err)=>{
            if(!err){
                res.send("Successfully updated The Article");
            }
        })
})
.patch((req,res)=>{
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        (err)=>{
            if(!err){
                res.send("Specific data updated");
            }
        }
    )
})
.delete((req,res)=>{
    Article.deleteOne(
        {title: req.params.articleTitle},
        (err)=>{
            if(!err){
                res.send("Successfully deleted");
            }
        }
    )
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });