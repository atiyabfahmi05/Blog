import express from "express";
import methodOverride from "method-override";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 8080;

app.set("view engine","ejs");
app.set("views","views");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

let posts =[
    {
        id : uuidv4(),
        username : "ApnaCollege",
        content : "I Love Coding"
    },
    {
        id : uuidv4(),
        username : "AtiyabFahmi",
        content : "Don't Wait For right Time"
    },
    {
        id : uuidv4(),
        username : "Rehan",
        content : "Time is Money"
    }
];

app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("see.ejs",{post});
});

app.post("/posts",(req,res)=>{
    let {username ,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    // res.send("Work Done!");
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let { id }= req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let { id }= req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.get("/",(req,res)=>{
    res.send("welcome to you!");
});

app.listen(port,()=>{
    console.log(`listening from ${port}`);
});