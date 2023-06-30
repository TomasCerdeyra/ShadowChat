import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 8);
    return hash
}

const checkPassword = async (password: string, passwordHashed: string)=> {
    const isCorrect = await bcrypt.compare(password, passwordHashed)
    return isCorrect
}

export {
    hashPassword,
    checkPassword
}