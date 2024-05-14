const get = (req, res)=>{
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    const main = async () => {
        const allUsers = await prisma.User.findMany()
        res.status(200).send(allUsers)
    }

    main()  
        .catch((err)=>{res.status(400).send(err)})
        .finally(async ()=>await prisma.$disconnect())
}

const post = (req, res)=>{
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const reqBody = req.body

    const main = async () => {
        await prisma.User.create({
            data: reqBody
        })
    }

    main()
        
    .then(res.sendStatus(200))
    .catch((err)=>{res.status(400).send(err)})
    .finally(async ()=>await prisma.$disconnect())
}

const put = (req, res)=>{
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const reqBody = req.body

    const main = async () => {
        await prisma.user.update({
            where: {
              email: reqBody.email,
            },
            data: {
              name: reqBody.name,
            },
          })
    }

    main()
        .then(res.sendStatus(200))
        .catch((err)=>{res.status(400).send(err)})
        .finally(async ()=>await prisma.$disconnect())
}

const del = (req, res)=>{
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const queryEmail = req.params.email

    const main = async () => {
        await prisma.user.delete({
            where: {
              email: queryEmail,
            }
        })
    }

    main()
        .then(res.sendStatus(200))
        .catch((err)=>{res.status(400).send(err)})
        .finally(async ()=>await prisma.$disconnect())
}

module.exports = {
    get,
    post,
    put,
    del
}