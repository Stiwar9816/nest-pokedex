import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interrface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/httpAdapters/fetch.adapter';

@Injectable()
export class SeedService {

  constructor(

    @InjectModel(Pokemon.name) // Inyectamos el modelo en nest
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: FetchAdapter // Adaptador de http (AxiosAdapter o FetchAdapter)
    
  ) { }

  async executedSeed() {

    await this.pokemonModel.deleteMany({}) // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=700')

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(async ({ name, url }) => {
      const segmensts = url.split('/')
      const no = +segmensts[segmensts.length - 2]
      pokemonToInsert.push({ name, no }) // [{ name: bulbasaur, no:1}]
      // const pokemon = await this.pokemonModel.create({ name, no }) // Creamos el dato en el modelo
      console.log({ name, no })
    })

    await this.pokemonModel.insertMany(pokemonToInsert) // Inserción masiva de datos

    return 'Seed executed';
  }
}
