const { PrismaClient } = require('@prisma/client')
const prisma           = new PrismaClient()

const FetchUser = async (email = "") => {
    return await prisma.User.findUnique({
        where: {
            email: email,
        },
    })
}

module.exports = FetchUser