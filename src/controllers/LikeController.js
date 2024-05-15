const { PrismaClient } = require('@prisma/client')
const prisma           = new PrismaClient()
const {ValidateReq}    = require("../services")

const Like = (req, res) => {
    const main = async () => {

        if(!ValidateReq(req, ["postId", "email"])) { throw {err: "Requisição mal-formatada"} }
        const {postId, email} = req.body

        const {FetchUser} = require("../services")
        const user = await FetchUser(email)
        
        if(user) {
            const existingLike = await prisma.Like.findFirst({
                where: {
                    AND: [{postId: postId}, {userId: user.id}]
                }
            })
            if(existingLike) {
                await prisma.Post.update({
                    where: {
                        id: postId,
                },
                data: {
                    score: {decrement: 1}
                }
                })
                await prisma.Like.delete({
                    where: {
                        id: existingLike.id
                    }
                })
            } else {
                await prisma.Post.update({
                    where: {
                        id: postId,
                },
                data: {
                    score: {increment: 1}
                }
                })
                await prisma.Like.create({
                    data: {
                        postId: postId,
                        userId: user.id
                    }
                })
            }
            res.status(201).send({message: "Post atualizado"})
        } else {
            res.status(404).send({message: "Usuário não encontrado"})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err.message||err);})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    Like,
}