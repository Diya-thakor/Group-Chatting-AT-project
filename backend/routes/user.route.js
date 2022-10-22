const router = require('express').Router();
let User = require('../models/user.model');
const multer = require('multer');

// Multer file upload settings 
// In DIR we have path where all images will be stored.
const DIR = './public/';
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    }
})
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            // (parameter) cb: multer.FileFilterCallback(error: null, acceptFile: boolean)
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post('/addUser', upload.single('profile'), (req, res, next) => {
    console.log("Inside addUser route of backend routes");
    // console.log(req.body);
    console.log(req);
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        profile: url + '/public/' + req.body.userName
        // profile:'/public/'+req.body.userName
    })
    user.save()
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            // res.json(error)
            if (error.code == 11000) {
                res.status(401).json({ message: "Username is already taken." })
            }
            console.log(error);
        })
});


module.exports = router;