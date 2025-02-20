
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
        return { user: {id: usuario.id, email: usuario.email}, token: token + ''};

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
        const token = await JwtAdapter.generateToken({ user });
        return {user: {
            id: user.id,
            email: loginUser.email
            }, token: token + ''
        }
    }
}
