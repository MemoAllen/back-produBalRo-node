
//mongoose para poderse conectar a la base de datos y ademas poder crear nuestros modelos
import { connect } from 'mongoose'


//metodo para conectarme a la base de datos llamada mean-gallery
export async function startConnection() {
    const db = await connect('mongodb://localhost/mean-gallery',{
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    console.log('Database is connected');
}
