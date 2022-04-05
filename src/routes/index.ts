import { Router,Request,Response,NextFunction } from 'express'
const router = Router();
import User from '../models/User';
import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto,signup,signin,verifyToken} from '../controllers/photo.controller'
import jwt from 'jsonwebtoken';
import Photo from '../models/Photo';
// middleware
// router.use(upload.single('image'));

// routes
router.route('/photos')
    .get(getPhotos)
    //sigle es para especifiacar que se subira un archivo a la vez de tipo image
    .post(upload.single('image'), createPhoto);





router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

router.route('/signup').post(signup);

router.route('/signin').post(signin);


    //////////////////////////////////

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     const newUser = new User({email, password});
//     await newUser.save();
// 		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
//     res.status(200).json({token});
// });

// router.post('/signin', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({email});
//     if (!user) return res.status(401).send('The email doen\' exists');
//     if (user.password !== password) return res.status(401).send('Wrong Password');

// 		const token = jwt.sign({_id: user._id}, 'secretkey');

//     return res.status(200).json({token});
// });

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

export default router;
