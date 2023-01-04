import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) // Inyectamos el modelo en nest
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase() // Convertimos en minúscula todo el nombre del pokemon

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto) // Creamos el dato en el modelo
      return pokemon;

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {

    let pokemon: Pokemon

    // Busqueda por N°
    if (!isNaN(+id)) { // Verificamos que el parametro de busqueda sea un numero
      pokemon = await this.pokemonModel.findOne({ no: id }) // Busqueda por la columna 'no'
    }

    // Busqueda por MongoID
    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id)
    }

    // Busqueda por Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: id.toLocaleLowerCase().trim() })
    }

    // Mensaje de error si no se encuentra el dato por ninguna validación
    if (!pokemon)
      throw new NotFoundException(` Pokemon with id, name or no "${id}" not found`)

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(id)

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
    }

    try {

      await pokemon.updateOne(updatePokemonDto)

      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne()
    // const result = await this.pokemonModel.findByIdAndDelete(id)
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" no found`)
    } else {
      console.log(`Pokemon with id "${id}" was removed successfully`)
    }
    return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {

      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)

    } else {

      console.log(error)
      throw new InternalServerErrorException(`Can't create pokemon - Check server logs`)

    }
  }
}