import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    /*
    Le indicamos a nest que tiene que importar el .env
    para poder usar las variables de entorno 
     */
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    //Servimos de manera estatica el index.html de la carpeta publica
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //Conexión con la DB de mongo nest-pokemon
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule { }
