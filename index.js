const express = require('express');
const server = express()
const PORT = 5000
//Standard imports for setting up Node.JS server with 5000 port

const postRouter = require("./posts/posts-router")
const commentRouter = require("./comments/comments-router")
//importing routers

server.use(express.json())
server.use("/api/posts", postRouter)
server.use("/api/comments", commentRouter)
//Server access to applications 

server.listen(PORT , ()=>{
    console.log(`Port running on ${PORT}`)
})
server.get('/', (req, res) => {
    res.send(`<h2>Get / Test</h2>`);
  });
  //Standard server testing functions