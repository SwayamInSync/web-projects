// jshint esversion: 6

const express = require('express');
const bodyparser = require('body-parser');
const date = require(__dirname+'/date.js')
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems=[];
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function (req,res) {


  let day = date.getDate()

  res.render("list", {list_title : day, newlistitems:items}); // render is same as sendFile()

});


app.post("/", function(req,res) {
  var item = req.body.newitem;

  if (req.body.list == "Work") {
    workitems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/"); // whenever a post req is made it redirects the page to homw page again making a GET request
  }


});

app.get("/work", function(req,res) {
  res.render("list", {list_title : "Work List", newlistitems: workitems});
});

app.post("/work", function(req,res) {
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(3000, function(){
  console.log("server is running on 3000");
});
