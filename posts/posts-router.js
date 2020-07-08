const express = require("express");

const router = express.Router()

module.exports = router
const db = require('../data/db');
const { findById } = require("../data/db");

router.post('/', (req , res) =>{
    const newPost  = req.body

    if(!newPost.title || !newPost.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else if (newPost.title && newPost.contents){
        db.insert(newPost)
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ errorMessage: "There was an error while saving the post to the database." })
        })
    }
})
router.post('/:id/comments', (req , res) =>{
    const newComment  = req.body
    const {id} = req.params
    const foundId = findById(id)

    if(!newComment.text){
        res.status(400).json({ errorMessage: "Please provide text for comment." })
    } else if (foundId !== id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (newComment.text){
        db.insertComment(newComment)
        .then(comment =>{
            res.status(201).json(comment)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({ errorMessage: "There was an error while saving the comment to the database." })
        })
    }

})
router.get('/', (req , res) =>{
    db.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ errorMessage: "The post information could not be retrieved" })
    })
    
})
router.get('/:id', (req , res) =>{
    const {id} = req.params

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(id){
    db.findById(id)
    .then(posts =>{
        res.status(200).json(posts)   
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
        })
    }
})

router.get('/:id/comments', (req , res) =>{
    const {id} = req.params
    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(id){
    db.findCommentsById(id)
    .then(comments =>{
        res.status(200).json(comments)   
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
        })
    }
})

router.delete('/:id', (req , res) =>{
    const {id} = req.params
    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(id){
    db.remove(id)
    .then(post =>{
        res.status(200).json(post)   
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The post information could not be removed." })
        })
    }
})

router.put('/:id', (req , res) =>{
    const putPost = req.body
    const {id} = req.params

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if (!putPost.title || !putPost.contents){
        res.status(400).json({ errorMessage:"Please provide title and contents for post"})
    } else if(putPost.title && putPost.contents){
    db.update(id, putPost)
    .then(newPost =>{
        res.status(200).json(newPost)   
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})