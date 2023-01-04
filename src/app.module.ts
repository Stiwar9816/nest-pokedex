import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //Servimos de manera estatica el index.html de la carpeta publica
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //Conexión con la DB de mongo nest-pokemon
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule
  ],
})
export class AppModule { }
