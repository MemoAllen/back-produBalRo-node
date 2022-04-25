import { Request, Response,NextFunction } from 'express'
import fs from 'fs-extra';
import path from 'path'
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// Models
import Photo, { IPhoto } from '../models/Photo';
import User from '../models/User';
import PasswordResset from '../models/PasswordResset';



const transporter = nodemailer.createTransport({
    host: "0.0.0.0",
    port: 1025,
  });


//Metodo para traer todos los productos, pero ademas para hacer la busqueda por title
export async function getPhotos(req: Request, res: Response): Promise<Response> {
    let productsName = new RegExp(`.*${req.query.searchBy || ''}.*`)
    const photos = await Photo.find({title:productsName});
    return res.json(photos);
};



export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const newPhoto = { title, description, imagePath: req.file.path };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}


export async function signup(req: Request, res: Response){
    const { email, password } = req.body;
    const newUser = new User({email, password});

    await newUser.save();
		const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({token});

}


export async function signin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
}
export async function verifyToken(req:any, res:Response, next:NextFunction) {
  
	try {
       
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload:any= jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
       
		req.userId=payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}



export async function forgotPassword(req: Request, res: Response): Promise<Response>{
    const email = req.body.email;
    const token = Math.random().toString(20).substr(2, 12);
  
    const passwordReset = new PasswordResset({
      email,
      token,
    });
  
    await passwordReset.save();
  
    const url = `http://localhost:4200/api/reset/${token}`;
    await transporter.sendMail({
      from: "admin@example.com",
      to: email,
      subject: "Reset Password",
      html: `Click <a href="${url}">Here</a> to reset your password`,
    });
  
    return res.json({
        message:  "Check your email"
    })

}


export async function resetPassword(req: Request, res: Response){
    if(req.body.password !== req.body.password_confirm){
        return res.status(400).send({
            message:"Password do not match"
        })

    }

    const passwordReset = await PasswordResset.findOne({token:req.body.token});

    if(passwordReset!=null){
        const {email} =await  passwordReset.toJSON();
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                message:"user not found"
            })
        }
    
        user.password = await req.body.password;
        user.save();
    
        res.send({
            message: "Success"
        })
    
    }
  
}