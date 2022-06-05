import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    email: String,
    codigo: String
}, {
    timestamps: true
});

//////////

// esta interface se usara Para poder ser visto dentro de nuestro navegador
export interface ICodeConfirm extends Document {
    email: String,
    codigo: String
}

export default model<ICodeConfirm>('CodeConfirm', schema);