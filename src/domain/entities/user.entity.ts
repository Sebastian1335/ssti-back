import { rol } from "@prisma/client";
import { CustomError } from "../errors/custom.error"

export class UserEntity {

    constructor(
      public id: number,
      public nombre: string,
      public email: string,
      public password: string,
      public nivel: number,
      public exp: number,
      public racha: number,
      public monedas: number,
      public rol: string
    ) { }
  
    static fromObject( object: { [ key: string ]: any; } ) {
      const { id, nombre, email, password, nivel, exp, racha, monedas, rol } = object;
  
      if ( !id ) {
        throw CustomError.badRequest( 'Missing id' );
      }
  
      if ( !nombre ) throw CustomError.badRequest( 'Missing name' );
      if ( !email ) throw CustomError.badRequest( 'Missing email' );
      if ( !password ) throw CustomError.badRequest( 'Missing password' );
      
  
      return new UserEntity( id, nombre, email, password, nivel, exp, racha, monedas, rol);
  
    }
  
  
  }