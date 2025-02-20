import jwt from 'jsonwebtoken'
import { envs } from './envs'


const JWT_SEED = envs.JWT_SECRET


export class JwtAdapter {
    static async generateToken(payload: any, duration: number = 60*60*24){
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {algorithm: 'none' , expiresIn: duration}, (err, token) => {
                if (err) return resolve(null)
                resolve(token)
            })
        })
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T)
            })
        })

    }
}