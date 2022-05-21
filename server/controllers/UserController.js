const UserSignUp = (req, res) => {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const main = async () => {
        const {email, name, password} = req.body
        const HashPwd = require('../services/HashPwd')
        await prisma.User.create({
            data: {
                email: email,
                name: name,
                password: await HashPwd(password)
            }
        })
    }

    main()
        .then(res.sendStatus(201))
        .catch((err)=>{res.status(500).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

const UserSignIn = (req, res) => {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const main = async () => {
        const {email, password} = req.body
        const AuthPwd = require('../services/AuthPwd')
        
        const user = await prisma.User.findUnique({
            where: {
              email: email,
            },
        })
        if(await AuthPwd(user.password, password))
            res.send(user).status(200)
        else
            res.sendStatus(400)
    }

    main()
        .catch((err)=>{res.status(500).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    UserSignUp,
    UserSignIn,
}