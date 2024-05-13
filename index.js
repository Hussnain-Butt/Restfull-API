const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const port = 8080;
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Hussnain",
    content: "I love Coding",
  },
  {
    id: uuidv4(),

    username: "Zainab",
    content: "I love Nothing",
  },
  {
    id: uuidv4(),

    username: "Abbas",
    content: "I love Designing",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
  console.log(post);
  res.send("patch working well");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");

  res.send("patch request working ");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;

  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
  console.log(post);
  res.redirect("/posts");
});

app.delete("/posts/:id/", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
