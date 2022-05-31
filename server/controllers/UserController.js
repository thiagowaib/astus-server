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
        res.status(201).send({message: "Usuário Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
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
        if(user) {
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
                res.status(202).send({accessToken, message: "Login bem-sucedido"})
            } else {
                res.status(401).send({message: "Senha Invalida"})
            }
        } else {
            res.status(404).send({message: "Email não Cadastrado"})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    UserSignUp,
    UserSignIn,
}