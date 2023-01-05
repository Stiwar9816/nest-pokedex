import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  // Importamos los schema que hemos creado para crearlos tambien en la  BD
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // Nombre del entity
        schema: PokemonSchema // Nombre del schema que proviene del entity
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokemonModule { }
