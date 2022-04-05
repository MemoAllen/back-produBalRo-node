//Aqui sera el encargado de guardar las imagenes dentro de la base de datos

import multer from 'multer'
import path from 'path'
import uuid from 'uuid/v4';

// Settings
const storage = multer.diskStorage({
    //destination lo que hace es darle la ruta en donde queremos que se guarden las imagenes.
    // en este caso se usara la carpeta uploads
    destination: 'uploads',
    //filename lo utilizaremos para darle un nombre a la imagen almacenada en nuestra bd
    //asi mismo utilizando el modulo uuid que este hace generar un id aleatoriamente y lo guarda
    // en la bd
    // + path.extname(file.originalname)) esto significa que concatenara la extension de la imagen 
    // es decir (jpg, png, etc)
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});
export default multer({storage});