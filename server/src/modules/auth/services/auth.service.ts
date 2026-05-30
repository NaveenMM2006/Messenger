import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import prisma from '../../../config/prisma'

const registerUser = async (
    fullName : string,
    email : string,
    password : string,
) => {

    const existingUser = await prisma.user.findUnique({
        where : {email},
    })

    if(existingUser) {
        throw new Error('User already Exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data : {
            fullName,
            email,
            password : hashedPassword,
        },
    })

    return user
}

const loginUser = async (
    email : string,
    password : string
)=>{
    const user = await prisma.user.findUnique({
        where : {email},
    })

    if(!user) {
        throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid) {
        throw new Error(' Invalid credentials')
    }

    const token = jwt.sign(
        {
            userId : user.id,
            email : user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn : '7d',
        },
    )

    return{
        token,
        user,
    }
}

export {
    registerUser,
    loginUser,
}