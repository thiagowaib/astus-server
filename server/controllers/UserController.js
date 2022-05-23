const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const UserSignUp = (req, res) => {    
    const main = async () => {
        const {email, name, password} = req.body
        const {HashPwd} = require('../services')
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
    const main = async () => {
        const {email, password} = req.body
        const { AuthPwd, SetExpDate } = require('../services')
        
        const user = await prisma.User.findUnique({
            where: {
              email: email,
            },
        })
        if(await AuthPwd(user.password, password)) {
            const payload = {
                email: user.email,
                name: user.name,
                exp: SetExpDate(Date.now(), 1, "h")
            }
            const accessToken= jwt.sign(
                payload,
                process.env.JWT_ACCESS_TOKEN_SECRET
            )
            res.send({accessToken}).status(200)
        }
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