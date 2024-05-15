const { PrismaClient } = require('@prisma/client')
const prisma           = new PrismaClient()
const {ValidateReq}    = require("../services")

const PostCreate = (req, res) => {
    const main = async () => {

        if(!ValidateReq(req, ["email", "title", "description", "media"])) { throw {err: "Requisição mal-formatada"} }
        const {email, title, description, media} = req.body
        
        const {FetchUser} = require("../services")
        const author = await FetchUser(email)

        if(author) {
            await prisma.Post.create({
                data: {
                    authorId: author.id,
                    title: title,
                    description: description,
                    media: Buffer.from(media),
                }
            })
            res.status(201).send({message: "Post criado"})
        } else {
            res.status(404).send({message: "Autor não encontrado"})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err.message||err);})
        .finally(async ()=>{await prisma.$disconnect()})
}

const PostFetch = (req, res) => {
    const main = async () => {

        const posts = await prisma.Post.findMany({
            where: {},
            orderBy: {
                score: 'desc'
            }
        })

        let formatedPosts = []
        posts.forEach(post => {
            formatedPosts.push({
                id: post.id,
                title: post.title,
                description: post.description,
                score: parseInt(post.score),
                comments: [],
                media: Buffer.from(post.media).toString()
            })
        });

        if(formatedPosts.length > 0) {
            res.status(200).send({message: "Posts buscados", posts: formatedPosts})
        } else {
            res.status(404).send({message: "Não foram encontrados nenhum post", posts: formatedPosts})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err.message||err);})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    PostCreate,
    PostFetch,
}