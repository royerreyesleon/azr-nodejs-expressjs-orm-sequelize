const { Router } = require("express");
const { destroy } = require("./../database/models/Post");
const router = Router();
// REQUERIR EL MODELO
// const Post = require('./../database/models/Post');
const Post = require('./../database/models/Post');



// RETORNAR TODOS
/*
http://localhost:3006/api/posts
*/
router.get('/' , (req , res)=>{

    Post.findAll().then(posts => {
        res.json(posts);
    })

});



// RETORNAR SOLO UNO POR EL ID
/*
http://localhost:3006/api/posts/1
*/
router.get('/:id' , (req , res)=>{
    Post.findByPk(req.params.id).then(post => {
        res.json(post);
    })
});


// CREAR
/*
http://localhost:3006/api/posts
Content-Type application/json
{
    "title" : "Nuevo 2",
    "description": "Nuevo desde post 2"
}
*/
router.post('/' , (req , res)=>{

    Post.create({
        title: req.body.title,
        description: req.body.description
    }).then(post => {
        res.json(post);
    }).catch(error => {
        console.log("Ocurrio error al guardar: ", error);
        res.json({status: error})
    })
 
 });



// ACTUALIZAR
/*
http://localhost:3006/api/posts/1
Content-Type application/json
{
    "title" : "Nuevo 2",
    "description": "Nuevo desde post 2"
}
*/
router.patch('/:id' , (req , res)=>{

    Post.update({
        title: req.body.title,
        description: req.body.description
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    });
 
});



// ELIMINAR
/*
http://localhost:3006/api/posts/1
*/
router.delete('/:id' , (req , res)=>{

    Post.destroy({
        where:{
            id : req.params.id
        }
    }).then(result => {
        res.json(result);
    })

});



module.exports = router;