import {sha256} from 'crypto-hash'

const encodedPassword = async (password: string) => await sha256(password)

export default encodedPassword;