const get = (req, res)=>{
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    const main = async () => {
        const allUsers = await prisma.User.findMany()
        res.send(allUsers).status(200)
    }

    main()
        .catch((err)=>{res.sendStatus(505); throw err;})
        .finally(async ()=>{await prisma.$disconnect()})
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
        .catch((err)=>{res.sendStatus(505); throw err;})
        .finally(async ()=>{await prisma.$disconnect(); res.sendStatus(200)})
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
        .catch((err)=>{res.sendStatus(505); throw err;})
        .finally(async ()=>{await prisma.$disconnect(); res.sendStatus(200)})
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
        .catch((err)=>{res.sendStatus(505); throw err;})
        .finally(async ()=>{await prisma.$disconnect(); res.sendStatus(200)})
}

module.exports = {
    get,
    post,
    put,
    del
}