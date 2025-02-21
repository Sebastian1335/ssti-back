
import { $Enums, rol } from '@prisma/client';
import { JwtAdapter } from '../../config/jwt.adapter';
import { prisma } from '../../data/postgres';
import { CustomError, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dto/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dto/auth/register-user.dto';


export class AuthService {

    async registro(createUserDTO: RegisterUserDto): Promise<{ user: Partial<UserEntity>; token: string; }> {
        const {password, ...usuario} = await prisma.user.create({
            data: {
                email: createUserDTO.email,
                nombre: createUserDTO.name,
                password: createUserDTO.password,
                direccion: createUserDTO.direccion,
                numeroCel: createUserDTO.numeroCel
            }
        })
        if (!usuario) throw CustomError.badRequest(`Error al registar el usuario`)
        const token = await JwtAdapter.generateToken({ usuario});
        if (!token) throw CustomError.internalServer("Error al crear JWT");
        return { user: {id: usuario.id, nombre: usuario.nombre, rol: usuario.rol}, token: token + ''};

    }

    public async loginUser(loginUser: LoginUserDto) {
        //FindONe para verificar si existe
        const user = await prisma.user.findUnique({
            where: {
                email: loginUser.email,
            },
        });
        if (!user) throw CustomError.badRequest("Usuario no registrado");
        const isMatch = loginUser.password === user.password ;
        if (!isMatch) throw CustomError.badRequest("Contraseña incorrecta");
        const token = await JwtAdapter.generateToken({ id: user.id, rol: user.rol });
        return {
            user: {
            id: user.id,
            nombre: user.nombre,
            rol: user.rol
            }, token: token + ''
        }
    }

    public async getUsers(){
        const users = await prisma.user.findMany()

        return users
    }

    public async getPeril(id: number, rol: $Enums.rol){
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user) throw CustomError.notFound("Usuario no encontrado")
        const {password,...resp} = user
        resp.rol = rol
        return resp
    }
}
