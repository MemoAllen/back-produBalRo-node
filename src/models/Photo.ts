//Clase para guardar los datos en bd

import { Schema, model, Document } from 'mongoose'

//El schema sera el que guardara los datos dentro de la base de datos
//cada campo se tendra que añadir dentro de esta parte
const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});


// esta interface se usara Para poder ser visto dentro de nuestro navegador
export interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', schema);