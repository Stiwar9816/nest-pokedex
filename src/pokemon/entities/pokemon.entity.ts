import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import { Document } from "mongoose"

// Le decimos a nest que esto se va a definir como un schema
@Schema()

/* 
Al extender la clase pokemon de Document 
mongo se va a encargar de la creación de los schemas necesarios
y estariamos definiendo la estructuras de nuestras tablas 
*/
export class Pokemon extends Document {
    @Prop({
        unique: true, // Indicamos que este atributo va a ser unico e irrepetible
        index: true // 
    })
    name: string

    @Prop({
        unique: true,
        index: true
    })
    no: number
}

/* 
Exportamos el schema para que cada vez que
se corra la base de datos de pueda crear el nuevo schema 
*/
export const PokemonSchema = SchemaFactory.createForClass(Pokemon)