import { regularExps } from "../../../config/regular-exp"



export class RegisterUserDto{
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public direccion: string,
        public numeroCel: string,

    ){}
    static create(object: {[key:string]: any}):[string?, RegisterUserDto?] {
        const {name, email, password, direccion, numeroCel} = object
        if(!name) return ['Missing name', undefined]
        if(!email) return ['Missing email', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if (!password) return ['missing password', undefined]
        if (password.length < 6) return ['password too short', undefined]
        if (!direccion) return ['missing direccion', undefined]
        if (!numeroCel) return ['missing numeroCel', undefined]

        return [undefined, new RegisterUserDto(name, email, password, direccion, numeroCel)]

    }
}

