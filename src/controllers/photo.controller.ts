import { Request, Response,NextFunction } from 'express'
import fs from 'fs-extra';
import path from 'path'
import jwt from 'jsonwebtoken';

// Models
import Photo, { IPhoto } from '../models/Photo';
import User from '../models/User';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
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
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
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

		const payload:any= await jwt.verify(token, 'secretkey');
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
