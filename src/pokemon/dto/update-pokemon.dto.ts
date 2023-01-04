import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './index';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
