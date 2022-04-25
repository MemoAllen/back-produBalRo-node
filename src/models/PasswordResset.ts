import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    email: String,
    token: String
}, {
    timestamps: true
});

//////////

// esta interface se usara Para poder ser visto dentro de nuestro navegador
export interface IPasswordReset extends Document {
    email: String,
    token: String
}

export default model<IPasswordReset>('PasswordReset', schema);