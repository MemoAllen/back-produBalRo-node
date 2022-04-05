import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true
});

//////////

// esta interface se usara Para poder ser visto dentro de nuestro navegador
export interface IUser extends Document {
    email: String,
    password: String
}

export default model<IUser>('User', schema);